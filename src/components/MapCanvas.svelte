<script>
	//Normal Code
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = 1200
	canvas.height = 400
	
	//Mouse movement to give coordinates
	let x
	let y
	canvas.addEventListener('mousemove', (e) => {
	  x = e.offsetX
    y = e.offsetY
	})

	canvas.addEventListener('click',(e) => {
		console.log(`The X Coordinate clicked is: ${x} and Y coordinate is ${y}`)
		localStorage.setItem('land',2116)
		window.location.href = '/purchase/details'
	})

	const updateCanvas = () => {
		ctx.fillStyle = 'red';
		ctx.fillRect(20, 20, 100, 50)
		ctx.fillRect(121,20,100,50)
		ctx.fillRect(222,20,100,50)
		ctx.fillRect(323,20,100,50)
		ctx.fillRect(424,20,100,50)
		ctx.fillRect(525,20,100,50)
		ctx.fillRect(626,20,100,50)
		ctx.fillRect(727,20,100,50)
		ctx.fillRect(828,20,100,50)
		ctx.fillRect(929,20,100,50)
		//Draw the road
		ctx.fillStyle = 'gray'
		ctx.fillRect(20,71,1010,30)
		ctx.fillStyle = 'red'
		ctx.fillRect(20,102,150,70)
		ctx.fillRect(20,173,150,70)
		//Draw the road
		ctx.fillStyle = 'gray'
		ctx.fillRect(20,244,1010,30)
		ctx.fillRect(171,100,30,145)
		ctx.fillStyle = 'red'
		ctx.fillRect(202,102,92,141)
		ctx.fillRect(295,102,92,141)
		ctx.strokeStyle = 'blue'
		ctx.fillStyle = 'white'
		ctx.strokeRect(388,102,92,141)
		ctx.strokeRect(481,102,92,141)
		ctx.strokeRect(574,102,92,141)
		ctx.fillStyle = 'red'
		ctx.fillRect(667,102,92,141)
		ctx.fillRect(760,102,92,141)
		ctx.fillRect(853,102,92,141)
		ctx.fillRect(946,102,84,141)
		ctx.fillRect(20,275,115,90)
		ctx.fillRect(136,275,115,90)
		ctx.fillRect(252,275,115,90)
		ctx.fillRect(368,275,115,90)
		ctx.fillRect(484,275,115,90)
		ctx.fillRect(600,275,430,90)
		//Show the inner line to show its a road
		//SHow on all the roads
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
		//Write Plot Numbers
		ctx.fillStyle = 'white'
		ctx.font = '12px Tahoma'
		ctx.fillText('2110',34,52)
		ctx.fillText('2109',134,52)
		ctx.fillText('2108',234,52)
		ctx.fillText('2107',334,52)
		ctx.fillText('2106',434,52)
		ctx.fillText('2105',534,52)
		ctx.fillText('2104',634,52)
		ctx.fillText('2103',734,52)
		ctx.fillText('2102',834,52)
		ctx.fillText('2101',934,52)
		ctx.fillText('2111',40,135)
		ctx.fillText('2112',44,220)
		ctx.fillText('2113',225,175)
		ctx.fillText('2114',320,175)
		ctx.fillStyle = 'black'
		ctx.fillText('2115',409,175)
		ctx.fillText('2116',513,175)
		ctx.fillText('2117',601,175)
		ctx.fillStyle = 'white'
		ctx.fillText('2118',690,175)
		ctx.fillText('2119',794,175)
		ctx.fillText('2120',885,175)
		ctx.fillText('2121',956,175)
		ctx.fillText('Road 6M wide',533,89)
		ctx.fillText('2122',38,323)
		ctx.fillText('2123',152,323)
		ctx.fillText('2124',277,323)
		ctx.fillText('2125',389,323)
		ctx.fillText('2126',501,323)
		ctx.fillText('2127',783,323)
	}

	let stateCheck = setInterval(() => {
	  if (document.readyState === 'complete') {
	    clearInterval(stateCheck);
	    updateCanvas()
	  }
	}, 100)
</script>

<div>
	x: {x} , y: {y}
</div>