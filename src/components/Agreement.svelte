<script>
import {onMount} from "svelte";

/**
 * Logic for generating the sales agreement form for the user 
 * finalizing property purchase
 */

let name;
let plot;
let downpayment;
let price;
let deposit;
let balance;
let error;
let year;
let month;
let date;
let address;
let id;
const currentDate = new Date();

/**
 * Determine deposit
 */
const setVariables = () => {
	if(downpayment == 'Ksh 250,000 downpayment with 12 monthly installments of KSH 33,333'){
		price = `650,000`;
		deposit = `250,000`;
		balance = `400,000`;
	}else if(downpayment == 'Ksh 200,000 downpayment with 6 monthly installments of KSH 65,833'){
		price = `595,000`;
		deposit = `200,000`;
		balance = `395,000`;
	}else {
		price = `550,000`;
	}

}

/**
 * To avoid running into problems, make sure that this code is running 
 * on the browser and not the server
 */

const loadData = async() => {
  if(localStorage.getItem("user") && localStorage.getItem("land") && localStorage.getItem("ipf")){
    const user = await JSON.parse(localStorage.getItem("user"));
    const land = await JSON.parse(localStorage.getItem("land"));
    const ipf = await JSON.parse(localStorage.getItem("ipf"));
    
    name = user.name;
    //email = user.email;
    //phone = user.phone;
    plot = land.plot;
    downpayment = ipf.downpayment;
    id = user.id;
    address = user.address;

    setVariables();
  }else{
    error = true;
  }
}

/**
 * Get the name of the month
 */
const getMonthName = () => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const currentMonthIndex = currentDate.getMonth();

  return months[currentMonthIndex];
}

/**
 * Get ordinal suffix for the month name i.e 1st, 2nd ...
 */
const getOrdinalSuffix = (number) => {
  if(number == 1){
  	return `${number}<sup>st</sup>`;
  }else if(number == 2){
  	return `${number}<sup>nd</sup>`;
  }else if(number == 3){
  	return `${number}<sup>rd</sup>`;
  }else {
  	`${number}<sup>th</sup>`;
  }
}

/**
 * Get the names of the next months
 */
const getNextMonthsNames = (n) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthIndex = currentDate.getMonth();
  const nextMonthsNames = [];

  for (let i = 0; i < n && i < 12; i++) {
    const nextMonthIndex = (currentMonthIndex + i) % 12;
    nextMonthsNames.push(months[nextMonthIndex]);
  }

  return nextMonthsNames;
}

/**
 * Determine if the agreement goes for 6 / 12 months
 */
const paymentDuration = () => {
	if(downpayment == 'Ksh 250,000 downpayment with 12 monthly installments of KSH 33,333'){
		return 12;
	}

	return 6;
}

/**
 * Generate the payment schedule string
 */
const generatePaymentHTML = (repeatCount, amount, date, month, year) => {
	let formattedString;
  let baseString = `<code>{letter})  ${amount} on or before ${date} {month}, {year}</code>`;
  const htmlOutput = [];
  const monthNames = getNextMonthsNames(repeatCount);

  for (let i = 0; i < repeatCount; i++) {
    const letter = String.fromCharCode(97 + i); // 'a' corresponds to 97 in ASCII
    // Check if the current month is December
    if (month === 'December' && i === 1) {
      // Increment the year for the next iteration
      year++;
    }

    //Get the name of the months
    month = monthNames[i];


    formattedString = baseString.replace(/{letter}/g, letter);
    formattedString = formattedString.replace(/{month}/g, month);
    formattedString = formattedString.replace(/{year}/g, year);

    htmlOutput.push(formattedString);
  }

  return htmlOutput.join('\n');
}

/**
 * Generate payment schedule details
 */
const generatePaymentScheduleDetails = () => {
	const duration = paymentDuration();

	if(duration == 6){
		return generatePaymentHTML(6,'KSH 65,833',date,month,year);
	} else {
		return generatePaymentHTML(12,'KSH 33,333',date,month,year);
	}
}

year = currentDate.getFullYear();
month = getMonthName();
date = getOrdinalSuffix(currentDate.getDate());

onMount(() => {
	loadData();
})
</script>

<hr>
<h1 class="code-line" data-line-start="0" data-line-end="1">
  SALES AGREEMENT
</h1>
<p class="has-line-data" data-line-start="2" data-line-end="3">DATED THIS {@html date} Day of {month} {year}</p>
<p class="has-line-data" data-line-start="4" data-line-end="5">AMY HOLDINGS LIMITED (the “Vendor”)</p>
<p class="has-line-data" data-line-start="6" data-line-end="8">TO <br> {name} (The “Purchaser”) </p>
<p class="has-line-data" data-line-start="9" data-line-end="11">In Relation to PLOT N0 {plot} <br> EXCISED FROM TITLE NUMBER <strong>NGOMENI SQUATTER SETT SCHEME/1792</strong>
</p>
<blockquote>
  <p class="has-line-data" data-line-start="12" data-line-end="21">DRAWN BY: - <br> Gikenye Mugo &amp; Rienye Advocates <br> Mountain Mall, 3rd Floor <br> Suite D32 <br> Thika Road <br> P.O Box 8802-00200 <br> Nairobi <br> Email: 
    <span>info@gmradvocates.co.ke</span>
    <br> Phone: +254729313261
  </p>
</blockquote>
<p class="has-line-data" data-line-start="23" data-line-end="24">THIS AGREEMENT is made on the {@html date} day of {month} {year} BETWEEN-</p>
<blockquote>
  <p class="has-line-data" data-line-start="25" data-line-end="26">AMY HOLDINGS LIMITED, company registration number <strong>CPR/2012/74069</strong> of P.O Box 311-00623 in the Republic of Kenya (Hereinafter the “Vendor” which expression shall where the context so admits include its successors in title and assigns); and </p>
</blockquote>
<blockquote>
  <p class="has-line-data" data-line-start="27" data-line-end="28"><strong><u>{name}</u></strong> holder of ID number <strong><u>{id}</u></strong>, <strong><u>{address}</u></strong> (hereafter the “Purchaser” which expression shall where the contexts allow include their personal representative(s) and assign(s)).</p>
</blockquote>
<p class="has-line-data" data-line-start="29" data-line-end="30">WHEREAS-</p>
<blockquote>
  <p class="has-line-data" data-line-start="30" data-line-end="31">A The vendor is the legal, equitable and or beneficial owner of all that property known as MARAFIKI HOMES situate in MALINDI County within the Republic of Kenya (hereafter the “Mother Property”).</p>
</blockquote>
<blockquote>
  <p class="has-line-data" data-line-start="32" data-line-end="33">B The Vendor has subdivided and or caused to be subdivided the mother property into various plots numbered sequentially.</p>
</blockquote>
<blockquote>
  <p class="has-line-data" data-line-start="34" data-line-end="35">C The Vendor wishes to sell and the purchaser have agreed to purchase plot known as plot {plot} excised from the mother property; measuring 50 by 100 or its equivalent area (hereafter the “Property”) for the terms hereinafter contained.</p>
</blockquote>
<p class="has-line-data" data-line-start="36" data-line-end="37">NOW THIS AGREEMENT WITNESS as follows:</p>
<h2 class="code-line" data-line-start="38" data-line-end="39">
  <a id="Agreement_to_Purchase_38"></a>Agreement to Purchase
</h2>
<blockquote>
  <p class="has-line-data" data-line-start="39" data-line-end="40">1.1. The Vendor sells and the Purchaser purchases the property for the Purchase Price and upon the terms and conditions set out in this Agreement.</p>
</blockquote>
<blockquote>
  <p class="has-line-data" data-line-start="41" data-line-end="42">1.2. The interest sold is the vendor’s interest contained in the Property.</p>
</blockquote>
<h2 class="code-line" data-line-start="43" data-line-end="44">
  <a id="Purchase_Price_43"></a>Purchase Price
</h2>
<p class="has-line-data" data-line-start="45" data-line-end="46">2.1. The purchase price for the Property will be Kshs. {price} (hereafter the “Purchase Price”)</p>

{#if typeof deposit == 'undefined'}
	<p class="has-line-data" data-line-start="47" data-line-end="48">2.2. Upon execution of the agreement, the Purchaser will make a full payment of Kshs. {price}.</p>
{:else}
	<p class="has-line-data" data-line-start="47" data-line-end="48">2.2. Upon execution of the agreement, the Purchaser will make a deposit of Kshs. {deposit}.</p>
	<p class="has-line-data" data-line-start="49" data-line-end="50">2.3. The balance of Ksh. {balance} will be paid as follows:-</p>
	<pre>{@html generatePaymentScheduleDetails()}</pre>
{/if}

<h2 class="code-line" data-line-start="63" data-line-end="64">
  <a id="Completion_Date_63"></a>Completion Date
</h2>
<p class="has-line-data" data-line-start="65" data-line-end="66">3.1. The Completion date shall be the date falling on the 90<sup>th</sup> day from the date the Vendor will obtain a Title Deed for the Property from subdivision or any other date as the parties may mutually agree.</p>
<p class="has-line-data" data-line-start="67" data-line-end="68">3.2. The Vendor shall be deemed to have fulfilled its obligations under this Agreement if on or before the Completion Date, it delivers to the parties’ advocate the following documents (hereafter the “Completion Documents”): -</p>
<pre><code>3.2.1.  A duly executed but undated Transfer (in triplicate) in favour of the Purchaser with respect to the parcel of the Property (the “Transfer”);

3.2.2.  The original Title deed.

3.2.3.  Copy of the Vendor’s directors National I.D., PIN Certificate, three (3) Colored passport size photographs.

3.2.4.  Copies of the Certificate of incorporation and a current CR12.

3.2.5.  The Land Control Board consent to transfer.

3.2.6.  Any other document necessary to effect the transfer of the Property from the Vendor, to the Purchaser. 
</code>
											</pre>
<p class="has-line-data" data-line-start="81" data-line-end="82">3.3. Completion shall not in any way prejudice or affect the operation of any of the provisions of this Agreement which contemplates or is capable of operation after Completion and accordingly all such provisions shall continue in full force and effect after completion.</p>
<h2 class="code-line" data-line-start="83" data-line-end="84">
  <a id="Stamping_and_Registration_83"></a>Stamping and Registration-
</h2>
<p class="has-line-data" data-line-start="85" data-line-end="86">4.1. Stamping and registration of the Transfer shall be undertaken by the parties’ advocates.</p>
<p class="has-line-data" data-line-start="87" data-line-end="88">4.2. The cost thereof will be borne by the vendor.</p>
<h2 class="code-line" data-line-start="89" data-line-end="90">
  <a id="Parties_Advocates_89"></a>Parties Advocates
</h2>
<p class="has-line-data" data-line-start="91" data-line-end="92">Parties’ Advocate will be Messrs. Gikenye Mugo &amp; Rienye Advocates, Mountain Mall, 3rd Floor, room D32; P.O Box 8802-00200 Nairobi.</p>
<h2 class="code-line" data-line-start="93" data-line-end="94">
  <a id="Law_Society_Conditions_of_Sale_93"></a>Law Society Conditions of Sale
</h2>
<p class="has-line-data" data-line-start="94" data-line-end="95">The sale is subject to the Law Society Conditions of Sale (2015 Edition) (“LSK Conditions”) in so far as they are not inconsistent with the conditions contained in this Agreement.</p>
<h2 class="code-line" data-line-start="96" data-line-end="97">
  <a id="Vacant_Possession_96"></a>Vacant Possession
</h2>
<p class="has-line-data" data-line-start="98" data-line-end="99">7.1. The Property is sold with vacant possession.</p>
<p class="has-line-data" data-line-start="100" data-line-end="101">7.2. The purchaser will be entitled to take possession of the Property upon payment of the purchase price in full.</p>
<h2 class="code-line" data-line-start="102" data-line-end="103">
  <a id="Matters_affecting_the_Property_102"></a>Matters affecting the Property
</h2>
<p class="has-line-data" data-line-start="103" data-line-end="104">The Property are sold subject to:</p>
<pre><code>a)  All subsisting easements, quasi easements and right of way if any.

b)  The Acts Reservations Stipulations and conditions contained or implied in the Title hereto.

c)  All present contingent, liabilities or assessments in respect of construction, maintenance and improvements of roads and sewerage serving the Property.

d)  The Vendor warrant that he has a good title to the Property being sold Property being the beneficial owner of the Property. 
</code></pre>
<h2 class="code-line" data-line-start="113" data-line-end="114">
  <a id="Warranties_113"></a>Warranties
</h2>
<p class="has-line-data" data-line-start="115" data-line-end="116">The Vendors warrant, represent and undertake to the Purchasers that: -</p>
<pre><code>a)  The Property are not a buffer zone, road reserve or public land and its ownership thereof is not subject to any challenge whatsoever from the Government of Kenya, any County Government (including but not limited to Local Authority) or any third party whatever;

b)  The Vendor has to best of its knowledge disclosed all material information threatened by any litigation, arbitration or administrative proceedings relating to this Property;

c)  There is no adverse claim on the Property, dispute regarding ownership boundary, easements, rights of way.

d)  The Vendor has not given any right of way, easements or any overriding interest and has no intention of so doing;

e)  The Vendor has to the best of its knowledge disclosed to the Purchasers all material information relating to the Property;

f)  The Vendor has not received any notice from government or municipal authority or from owners of adjoining Property which remain to be complied with, and have disclosed all such notices received to the Purchases;

g)  The Vendor will immediately disclose in writing on the Purchaser any event or circumstance which may arise or become known to her after the date of this Agreement and prior to completion which is inconsistent with any of the warranties or which had it occurred on or before the date of this agreement would have constituted a breach of the warranties or which is material to be known by a Purchaser for the value of the Property.
</code></pre>
<h2 class="code-line" data-line-start="132" data-line-end="133">
  <a id="Condition_of_the_Property_132"></a>Condition of the Property
</h2>
<p class="has-line-data" data-line-start="134" data-line-end="135">The Purchaser having been afforded the opportunity of viewing and inspecting the Property prior to the date of this Agreement, purchase it in the same condition it is in now, and shall not require the Vendor to improve it in any manner whatsoever PROVIDED however that the Vendor shall maintain the Property in its current condition save for fencing until the sale transaction is completed and the possession is given to the Purchaser.</p>
<h2 class="code-line" data-line-start="136" data-line-end="137">
  <a id="Termination_and_Rescission_136"></a>Termination and Rescission
</h2>
<p class="has-line-data" data-line-start="138" data-line-end="139">11.1. The Purchaser shall be at liberty to terminate this agreement at any time within 7 days from the date the Purchaser shall be taken to a site visit. Upon lapse of the 7 days, the agreement can only be terminated as herein below-</p>
<p class="has-line-data" data-line-start="140" data-line-end="141">11.2. Either party being ready, able and willing to complete shall be entitled to terminate this Agreement for Sale only due to breach or default of the other party in complying with or performing his obligations in accordance with this Agreement for Sale other than due to Force Majeure set out herein below.</p>
<p class="has-line-data" data-line-start="142" data-line-end="143">11.3. Termination shall be by notice in writing to the party in breach or default specifying the breach or default and allowing the other party a period not less than Twenty One (21) working days from the date of the Notice (which shall be referred to as the “Completion Notice”) to rectify the breach or default and where the party in breach or default fails to rectify the same within Twenty One working (21) days from the date of service of such a notice or such longer period specified therein or subsequently extended by notice, then this Sale Agreement shall terminate and stand rescinded upon the expiry of that period without the necessity of issuance of a rescission notice.</p>
<p class="has-line-data" data-line-start="144" data-line-end="145">11.4. In the event that the Agreement for Sale is rescinded by the Purchasers for the Vendor’s default, the Vendor shall refund (without interest) to the Purchaser’s the deposit paid and any other sums received.</p>
<p class="has-line-data" data-line-start="146" data-line-end="147">11.5. In the event that the Agreement for Sale is rescinded by the Vendor for the purchaser’s default, the Vendor shall refund to the Purchaser the deposit and any other amount paid less damages equivalent to Ten (10%) percent of the purchase price and charges including legal charges incurred by the Vendor for the purpose of this agreement.</p>
<h2 class="code-line" data-line-start="148" data-line-end="149">
  <a id="Waiver_148"></a>Waiver
</h2>
<p class="has-line-data" data-line-start="149" data-line-end="150">No failure or delay by the Vendor or the Purchaser in exercising any claim, remedy, right, power or privilege under this Agreement shall operate as a waiver nor shall any single or partial exercise of any claim, remedy, right, power or privilege preclude any further exercise thereof or the exercise of any other claim, right or power.</p>
<h2 class="code-line" data-line-start="151" data-line-end="152">
  <a id="Amendment_151"></a>Amendment
</h2>
<p class="has-line-data" data-line-start="153" data-line-end="154">No amendment to this Agreement shall be effective unless signed in the same manner as this Agreement.</p>
<h2 class="code-line" data-line-start="155" data-line-end="156">
  <a id="Notice_155"></a>Notice
</h2>
<p class="has-line-data" data-line-start="157" data-line-end="158">Any notice, request or demand required or permitted to be given, made or served under this Agreement shall be in writing and shall be deemed to have duly given, made or served when addressed and served on the office of the Advocates to each party as set out above, sent electronically through WhatsApp or email, or in default to be sent by registered postage by a party to the other intended to be served through the recipient party’s postal address as contained in this Agreement or whose change is subsequently notified to the other in writing.</p>
<h2 class="code-line" data-line-start="159" data-line-end="160">
  <a id="Antimoney_laundering_159"></a>Anti-money laundering
</h2>
<p class="has-line-data" data-line-start="161" data-line-end="162">15.1. The Purchaser confirms, represents and warrants that it is in compliance with all applicable laws and statutes relating to anti-bribery, anti-corruption, and anti-money laundering in Kenya and any sums paid pursuant to this Agreement are not and shall not be from the proceeds of crime.</p>
<p class="has-line-data" data-line-start="163" data-line-end="164">15.2. The Purchaser hereby indemnifies the Vendor against any loss that the Vendor may suffer as a result of the funds employed for the Purchase Price or any sums pursuant to this Agreement being deemed by any Competent Authority to be from proceeds of crime.</p>
<h2 class="code-line" data-line-start="165" data-line-end="166">
  <a id="Severability_165"></a>Severability
</h2>
<p class="has-line-data" data-line-start="166" data-line-end="167">Each of the provisions of the Agreement is severable and distinct from the others and, if at any time one or more of these provisions is or becomes invalid, illegal or unenforceable, the validity, legality and enforceability of the remaining provisions shall not in any way be affected or impaired.</p>
<h2 class="code-line" data-line-start="168" data-line-end="169">
  <a id="Entire_Agreement_168"></a>Entire Agreement
</h2>
<p class="has-line-data" data-line-start="169" data-line-end="170">This Agreement contains the whole agreement and understanding between the parties relating to the transaction provided for in this Agreement and supersedes all previous agreements (if any) whether written or oral between the parties in respect of such matters.</p>
<pre><code>IN WITNESS WHEREOF the Vendor and the Purchaser hereto have executed this Agreement on the day and year first hereinbefore written.

SEALED with the Common Seal of              
The VENDOR                          
AMY HOLDINGS LIMITED                            (SEAL)

By:                                         
Director                            

_____________________________________
                            
                                
Advocate 
Certificate
I certify that I was present and saw directors of the Vendor sign this Agreement

_____________________________________
Advocate

SIGNED by the PURCHASER                       
                                  
{name}
In the presence of: -                   

_____________________________________
Advocate                            
Certificate

I certify that I was present and saw the Purchaser herein, duly sign this Agreement. 

_____________________________________
Advocate
</code></pre>