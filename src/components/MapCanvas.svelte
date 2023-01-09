<script>
	import Swal from 'sweetalert'
	//Get the property prop from Astro
	export let property
	
	//Map data store here
	let data
	let store = []

	//Set canvas
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 1200
	canvas.height = 650
	
	//Mouse movement to give coordinates
	let x
	let y

	canvas.addEventListener('mousemove', (e) => {
	  x = e.offsetX
    y = e.offsetY
	})

	//Get the plots from the database
	const loadPlots = async () => {
		if(property === 'marafiki-residence'){
			const res = await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/wp/v2/posts?categories=14&per_page=100&_fields=acf&tags=15`)
			data = await res.json()
    }else if(property === 'marafiki-homes'){
    	const res = await fetch(`${import.meta.env.PUBLIC_CMS}wp-json/wp/v2/posts?categories=14&per_page=100&_fields=acf&tags=16`)
			data = await res.json()
    }else{
    	alert("Unknown property, Unable to fetch data")
    	console.error('Unable to get map. Unknown property')
    }
	}

	//Map Key to guide users
	const generateMapKey = () => {
		//MAP KEY
		ctx.fillStyle = 'black'
		ctx.font = '24px Tahoma'
		ctx.fillText('MAP KEY',1068,150)
		ctx.font = '12px Arial'
		ctx.fillText('Map not drawn to scale',1068,175)
		//Show the road
		ctx.fillStyle = 'black'
		ctx.fillRect(1070,216,50,30)
		ctx.fillStyle = 'white'
		ctx.beginPath()
		ctx.setLineDash([5,5])
		ctx.moveTo(1078,230)
		ctx.lineTo(1115,230)
		ctx.closePath()
		ctx.stroke()
		ctx.font = '18px Tahoma'
		ctx.fillStyle = 'black'
		ctx.fillText('Road',1128,239)

		//Show available property
		ctx.fillStyle = 'white'
		ctx.fillRect(1070,282,50,30)
		ctx.fillStyle = 'black'
		ctx.fillText('Available',1128,305)

		//show booked property
		ctx.fillStyle = 'orange'
		ctx.fillRect(1070,333,50,30)
		ctx.fillStyle = 'black'
		ctx.fillText('On hold',1128,356)

		//Show taken property
		ctx.fillStyle = 'red'
		ctx.fillRect(1070,380,50,30)
		ctx.fillStyle = 'black'
		ctx.fillText('Taken',1128,403)

		//Draw the compass
		ctx.strokeStyle = 'black'
		ctx.beginPath()
		ctx.setLineDash([0,0])
		ctx.moveTo(1129,560)
		ctx.lineTo(1129,450)
		ctx.closePath()
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(1129,450)
		ctx.lineTo(1100,475)
		ctx.lineTo(1160,475)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(1080,506)
		ctx.lineTo(1182,506)
		ctx.stroke()
		ctx.fillText('N',1154,447)
	}

	//Draw rectangular plots
	const drawRectangle = (ctx,status,cdnts,number='0000',textcdnts) => {
		const coordinates = cdnts.split(',')
		
		if (status === 'Sold') {
			ctx.strokeStyle = 'white'
			ctx.fillStyle = 'red'
		}else if (status === 'On hold') {
			ctx.strokeStyle = 'white'
			ctx.fillStyle = 'orange'
		}else{
			ctx.strokeStyle = 'black'
			ctx.fillStyle = 'white'
		}
		
		if(status === 'For sale'){
			ctx.strokeRect(coordinates[0],coordinates[1],coordinates[2],coordinates[3])
			ctx.fillRect(coordinates[0],coordinates[1],coordinates[2],coordinates[3])
		}else{
			ctx.fillRect(coordinates[0],coordinates[1],coordinates[2],coordinates[3])
		}

		lablePlot(ctx,status,textcdnts,number)

		//Track clicked zone
		const db = {}
		db.label = number
		db.xMax = Number(coordinates[0]) + Number(coordinates[2])
		db.xMin = Number(coordinates[0])
		db.yMax = Number(coordinates[1]) + Number(coordinates[3])
		db.yMin = Number(coordinates[1])
		db.status = status

		store.push(db)
	}

	//Draw polygonal plots
	const drawPolygon = (ctx,status,cdnts,number='0000',textcdnts) => {
		const coordinates = cdnts.split(',')
		const clickCoordinates = textcdnts.split(',')
		
		if (status === 'Sold') {
			ctx.strokeStyle = 'white'
			ctx.fillStyle = 'red'
		}else if (status === 'On hold') {
			ctx.strokeStyle = 'white'
			ctx.fillStyle = 'orange'
		}else{
			ctx.strokeStyle = 'black'
			ctx.fillStyle = 'white'
		}

		ctx.beginPath()
		ctx.moveTo(coordinates[0],coordinates[1])
		ctx.lineTo(coordinates[2],coordinates[3])
		ctx.lineTo(coordinates[4],coordinates[5])
		ctx.lineTo(coordinates[6],coordinates[7])
		ctx.closePath()
		ctx.fill()
		ctx.stroke()

		lablePlot(ctx,status,textcdnts,number)

		//Track clicked zone
		//For the polygon, to be able to account for the irregular shape, only
		//allow clicks at the text label since it has a definite shape
		const db = {}
		db.label = number
		db.xMax = Number(clickCoordinates[0]) + 50
		db.xMin = Number(clickCoordinates[0]) - 50
		db.yMax = Number(clickCoordinates[1]) + 50
		db.yMin = Number(clickCoordinates[1]) - 50
		db.status = status

		store.push(db)
	}

	//Draw map
	const drawMap = (ctx,status,coordinates,number='0000',type,textcdnts) => {
		if (type === 'Polygon') {
			drawPolygon(ctx,status,coordinates,number,textcdnts)
		}else{
			drawRectangle(ctx,status,coordinates,number,textcdnts)
		}
	}

	//Draw plot lables
	const lablePlot = (ctx,status,cdnts,number) => {
		const coordinates = cdnts.split(',')
		ctx.font = '12px Tahoma'
		
		if (status === 'Sold' || status === 'On hold') {
			ctx.fillStyle = 'white'
		}else{
			ctx.fillStyle = 'black'
		}

		if(coordinates.length == 3){
			ctx.fillText(coordinates[2],coordinates[0],coordinates[1])
		}else{
			ctx.fillText(number,coordinates[0],coordinates[1])
		}

	}

	const canvasUpdater = () => {
		if (property === 'marafiki-residence') {
			updateResidenceCanvas()
		}else if (property === 'marafiki-homes') {
			updateHomeCanvas()
		}

		data.map((item) => {
			if (item.acf.project === 'Marafiki Residence') {
				drawMap(ctx,item.acf.status,item.acf.coordinates,String(item.acf.property_code),item.acf.type,item.acf.text_coordinates)
			}else{
				drawMap(ctx,item.acf.status,item.acf.coordinates,String(item.acf.property_code),item.acf.type,item.acf.text_coordinates)
			}
		})
	}

	//Marafiki Residence Map
	const updateResidenceCanvas = () => {
		canvas.height = 580
		//Draw the road
		ctx.fillStyle = 'black'
		ctx.fillRect(20,71,1010,30) //Road
		ctx.fillRect(20,244,1010,30)//Road
		ctx.fillRect(171,100,30,145)//Road
		ctx.strokeStyle = 'white'
		ctx.beginPath()
		ctx.setLineDash([5,25])
		ctx.moveTo(40,87)
		ctx.lineTo(1023,87)
		ctx.moveTo(40,261)
		ctx.lineTo(1023,261)
		ctx.moveTo(186,106)
		ctx.lineTo(186,241)
		ctx.stroke()
		ctx.fillStyle = 'white'
		ctx.font = '14px Tahoma'
		ctx.fillText('Road 6M wide',533,89)
		ctx.fillStyle = 'black'
		ctx.font = '32px Tahoma'
		//ctx.fillText('Map not drawn to scale',225,480)

		generateMapKey()
		//drawMap(ctx,status,coordinates,number,type,textcdnts)
	}

	const updateHomeCanvas = () => {
		//Marafiki Homes Map
		//Map is skewed. Change height of the map
		canvas.height = 650
		
		//The road
		ctx.strokeStyle = 'white'
		ctx.fillStyle = 'black'
		ctx.beginPath()
		ctx.moveTo(20,375)
		ctx.lineTo(840,375)
		ctx.lineTo(840,570)
		ctx.lineTo(865,570)
		ctx.lineTo(865,34)
		ctx.lineTo(840,36)
		ctx.lineTo(840,155)
		ctx.lineTo(245,195)
		ctx.lineTo(245,220)
		ctx.lineTo(840,180)
		ctx.lineTo(840,350)
		ctx.lineTo(20,350)
		ctx.closePath()
		ctx.stroke()
		ctx.fill()

		//The inner markings of the road
		//Show on all the roads
		ctx.beginPath()
		ctx.setLineDash([5,25])
		ctx.moveTo(40,363)
		ctx.lineTo(850,363)
		ctx.moveTo(852,550)
		ctx.lineTo(852,39)
		ctx.moveTo(256,207)
		ctx.lineTo(835,170)
		ctx.stroke()

		//Write plot numbers
		ctx.fillStyle = 'white'
		ctx.font = '14px Tahoma'
		ctx.fillText('TOTAL AREA (A)',51,142)
		ctx.fillText('1 Acres / 0.405 HA',51,196)
		ctx.fillText('Road 6M Wide',350,365)
		ctx.fillStyle = 'black'
		//ctx.fillText('Total Area (A) 4.25 Acres / 1.6555 HA',382,628)

		generateMapKey()
		//drawMap(ctx,status,coordinates,number,type,textcdnts)
	}

	//Watch map data variable and draw the maps as soon as the data is available
	$:{
		if(typeof data !== 'undefined'){
			canvasUpdater()
		}
	}

	//Return coordinate clicked and react accordingly
	const determineLocationClicked = () => {
		//Not efficient when the map is larger as this function has 
		//a higher execution time.
		//Might want to optimize in future for easier searching and sorting of the data.
		store.every((item) => {
			if(x <= item.xMax && x >= item.xMin && y <= item.yMax && y >= item.yMin){
				if(item.status === 'Sold'){
					swal({
					  title: "Plot already sold",
					  text: `Sorry, plot number ${item.label} is already taken and can not be sold to another client`,
					  icon: "warning"
					})
				}else{
					localStorage.setItem('land',JSON.stringify({"plot":item.label,"status":item.status}))
					localStorage.setItem('prev', window.location.href)
					
					swal({
					  title: "Congratulations",
					  text: `You have succesfully selected plot number ${item.label}. Complete the purchase process now`,
					  icon: "success"
					})
					.then((willDelete) => {
						window.location.href = '/purchase/details'
					})

					return true
				}
				//For loop to continue
				return false
			}
			//Terminate loop
			return true
		})
	}

	canvas.addEventListener('click',() => {
		determineLocationClicked()
	})

	loadPlots()
</script>

<!--<div>
	x: {x} , y: {y}
</div>-->