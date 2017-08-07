// 3 parameters controlling the different levels of elements
var gest = 2;
var dist = 1;
var shad = 0;
function setActor1(){ // set the position and gesture of actor 1
	var act1 = document.getElementById('actor1');
	if(gest==0){//Neutral
		act1.setAttribute('t', 'translate(94,19) rotate(-2)');
		act1.setAttribute('pose', '-11,9|-5,117|-11,99|-11,89|-11,79|-11,59|-16,34|-21,9|-6,34|-1,9|-18,79|-18,59|-6,79|-1,59');
		//Old version
		//act1.setAttribute('pose', '-11,9|-9,120|-11,99|-11,89|-11,79|-11,59|-16,34|-21,9|-6,34|-1,9|-18,79|-18,59|5,86|22,81');
	}
	else if(gest==1){
		act1.setAttribute('t', 'translate(71,19) rotate(-2)');
		//Negative
		//act1.setAttribute('pose', '-11,9|1,114|-9,98|-9,88|-15,79|-11,59|-16,34|-21,9|-6,34|-1,9|-19,78|-19,58|4,82|18,110');
		//Positive
		act1.setAttribute('pose', '-11,9|-20,121|-11,99|-11,89|-2,76|-1,54|-16,32|-21,7|15,40|20,15|-32,81|-35,57|11,106|12,128');
	}
	else{ //gest = 2
		act1.setAttribute('t', 'translate(71,19) rotate(-2)');
		//Negative
		//act1.setAttribute('pose', '-11,9|13,90|-3,80|-5,60|-9,66|-8,46|14,29|-11,21|8,39|-16,29|-13,68|-12,52|10,64|25,80');
		//Positive
		act1.setAttribute('pose', '-11,9|-17,116|-11,99|-4,92|5,78|-1,58|-9,40|-28,29|23,59|28,40|-33,95|-54,114|8,111|17,136');
	}
	if(dist==0){ // set position
		if(gest==2)
			act1.setAttribute('t', 'translate(94,1) rotate(-2)');
		else
			act1.setAttribute('t', 'translate(94,19) rotate(-2)');
	}
	else if(dist==1){
		if(gest==2)
			act1.setAttribute('t', 'translate(81,1) rotate(-2)');
		else
			act1.setAttribute('t', 'translate(81,19) rotate(-2)');
	}
	else{
		if(gest==2)
			act1.setAttribute('t', 'translate(71,1) rotate(-2)');
		else
			act1.setAttribute('t', 'translate(71,19) rotate(-2)');
	}
}
function setActor2(){ // set the position and gesture of actor 2
	var act2 = document.getElementById('actor2');
	if(gest==0){
		act2.setAttribute('t', 'translate(159,10)');
		act2.setAttribute('pose', "28,1|30,109|28,91|28,81|28,71|28,51|18,31|18,1|33,26|38,1|17,76|-4,71|38,71|38,51");
	}
	else if(gest==1){
		act2.setAttribute('t', 'translate(169,10)');
		act2.setAttribute('pose', "28,1|30,109|28,91|28,81|28,71|28,51|18,31|18,1|33,26|38,1|17,76|-4,71|38,71|38,51");
	}
	else{
		act2.setAttribute('t', 'translate(169,10)');
		act2.setAttribute('pose', "28,1|30,109|28,91|28,81|28,71|28,51|18,31|18,1|33,26|38,1|17,76|-4,71|38,71|38,51");
	}
	if(dist==0){ //set position
		act2.setAttribute('t', 'translate(139,18)');
	}
	else if(dist==1){
		act2.setAttribute('t', 'translate(156,17) rotate(-1)');
	}
	else{
		act2.setAttribute('t', 'translate(179,18) rotate(-1)');
	}
}
function render(){
	//alert("inside!!");
	var cols = document.getElementsByClassName('cmx-scene');
  		// change the shading of the comic panel based on shading score
  		for(i=0; i<cols.length; i++) {
  			if(shad==1){
  				cols[i].style.backgroundColor = '#cccccc';
  			}
  			else if(shad==2){
  				cols[i].style.backgroundColor = '#999999';
  			}
 			else{
 				cols[i].style.backgroundColor = '#ffffff';
  			}
  			//alert("inside!!");
  		}
			shad = (shad+1)%3;
}

function switchTextComic(){
	var elem = document.getElementById("middlePart");
	elem.parentNode.insertBefore(elem,elem.parentNode.firstElementChild);
	elem.parentNode.insertBefore(elem.parentNode.lastElementChild,elem.parentNode.firstElementChild);
}

function comicPosition(){
	if(Math.random() >= 0.5)
	{
		switchTextComic()
	}
}
