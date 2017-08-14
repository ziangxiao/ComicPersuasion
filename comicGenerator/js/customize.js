//Some default parameters
var defaultLimit = 20
// 3 parameters controlling the different levels of elements
// gest: (neg)-2,-1,0,1,2(pos)
var defaultGest = 0;
var defaultDist = 2;
var defaultShad = 0;

var labelMessage = "One day, your friend tell you...";

var msgA = ["No!"]
var msgB = ["Congrats!","You have reached your goal of exercising three times a week."]
function load(){
	var gest = document.getElementById("gestArea").value;
	var dist = document.getElementById("distArea").value;
	var shad = document.getElementById("gestArea").value;
	render(gest,dist,shad,msgA,msgB);
}

function getMsgSplitList(msg, lengthLimit){
	var msgList = [];
	var msgSplit = msg.split(" ")
	//console.log(msgSplit)	
	var count = 0;
	var lineNum = 0;
	var tmpMsg = '';
	while(msgSplit[count]){
		//console.log(msgSplit[count])
		if(tmpMsg.length + msgSplit[count].length <= lengthLimit){
			tmpMsg += msgSplit[count]+' ';
		}
		else{
			msgList.push(tmpMsg);
			tmpMsg = msgSplit[count]+' ';
		}
		count+=1;
		//console.log(tmpMsg)
	}
	if(tmpMsg != ''){
		msgList.push(tmpMsg);
	}
	return msgList;
}		

function setBackgroundShading(shad){
	var canvas = document.getElementById("comicCanvas");
	// Calculate the color
	// Input is from 0 to 3
	var colorNum = Math.floor(((3 - parseFloat(shad))*255/3)).toString();
	console.log(colorNum)
	canvas.style.backgroundColor = "rgb("+colorNum+","+colorNum+","+colorNum+")";
}

function setInfoLabel(x,y,message){
	var container = new createjs.Container();
	container.x = x;
	container.y = y;
	// Calculate label height and width
	labelWidth = 150;
	labelFontSize = 15;
	// todo: a little problem in the limit setting
	msgList = getMsgSplitList(message, labelWidth/labelFontSize*2);
	labelHeight = labelFontSize * msgList.length +5;
	
	var label = new createjs.Shape();
	label.graphics.setStrokeStyle(2).beginStroke("black");
	label.graphics.beginFill("white").drawRect(0, 0, labelWidth, labelHeight);
	container.addChild(label);

	var tmpY = 0;
	for (var i =0; i < msgList.length; i++){
		var tmpMsg = msgList[i];
		var msgText = new createjs.Text(tmpMsg,labelFontSize.toString()+"px Arial","black");
		msgText.x = 5;
		msgText.y = tmpY;
		container.addChild(msgText);
		tmpY += labelFontSize;
		//console.log(tmpMsg)
	}
	return container;
}

// x, y determines the position of the container
// gest has 3 values:0,1,2
// ori is 1(the character is facing left) or -1
function setCharacter(x,y,gest=defaultGest,ori = -1){
	var container = new createjs.Container();
	container.x = x;
	container.y = y;
	// Points for the head
	var headPointX, headPointY, headRadius;
	// bodyPointA is also the start point of the arms, bodyPointC is the start point of the legs
	var bodyPointAX,bodyPointAY, bodyPointBX,bodyPointBY, bodyPointCX,bodyPointCY;
	// Arms
	var leftArmPointAX,leftArmPointAY, leftArmPointBX,leftArmPointBY;
	var rightArmPointAX,rightArmPointAY, rightArmPointBX,rightArmPointBY;
	// Legs
	var leftLegPointAX,leftLegPointAY, leftLegPointBX,leftLegPointBY;
	var rightLegPointAX,rightLegPointAY, rightLegPointBX,rightLegPointBY;
	
	switch(gest){
		case -2:
			//head
			headPointX=0; headPointY=0; headRadius=20;
			//body
			bodyPointAX=headPointX+ori*16;bodyPointAY=headPointY+headRadius-8; 
			bodyPointBX=bodyPointAX+ori*10;bodyPointBY=bodyPointAY+15;
			bodyPointCX=bodyPointAX+ori*10;bodyPointCY=bodyPointAY+40;
			// Arms
			leftArmPointAX=bodyPointAX+ori*13;leftArmPointAY=bodyPointAY+15;
			leftArmPointBX=leftArmPointAX;leftArmPointBY=leftArmPointAY+20;
			rightArmPointAX=bodyPointAX+ori*(-10);rightArmPointAY=bodyPointAY+20;
			rightArmPointBX=rightArmPointAX+ori*(-20);rightArmPointBY=rightArmPointAY-20;
			// Legs
			leftLegPointAX=bodyPointCX-ori*16;leftLegPointAY=bodyPointCY+20;
			leftLegPointBX=leftLegPointAX+ori*30;leftLegPointBY=leftLegPointAY+5;
			rightLegPointAX=bodyPointCX-ori*8;rightLegPointAY=bodyPointCY+16;
			rightLegPointBX=rightLegPointAX+ori*28;rightLegPointBY=rightLegPointAY+3;
			break;
		case -1:
			headPointX=0; headPointY=0; headRadius=20;
			//body
			bodyPointAX=headPointX+ori*12;bodyPointAY=headPointY+headRadius-4; 
			bodyPointBX=bodyPointAX+ori*8;bodyPointBY=bodyPointAY+18;
			bodyPointCX=bodyPointAX+ori*8;bodyPointCY=bodyPointAY+40;
			// Arms
			leftArmPointAX=bodyPointAX-ori*8;leftArmPointAY=bodyPointAY+18;
			leftArmPointBX=leftArmPointAX-ori*3;leftArmPointBY=leftArmPointAY+25;
			rightArmPointAX=bodyPointAX+ori*(-2);rightArmPointAY=bodyPointAY+20;
			rightArmPointBX=rightArmPointAX+ori*(-2);rightArmPointBY=rightArmPointAY+25;
			// Legs
			leftLegPointAX=bodyPointCX+ori*5;leftLegPointAY=bodyPointCY+20;
			leftLegPointBX=leftLegPointAX+ori*3;leftLegPointBY=leftLegPointAY+20;
			rightLegPointAX=bodyPointCX-ori*8;rightLegPointAY=bodyPointCY+16;
			rightLegPointBX=rightLegPointAX-ori*3;rightLegPointBY=rightLegPointAY+20;
			break;
		case 0:
			headPointX=0; headPointY=0; headRadius=20;
			//body
			bodyPointAX=headPointX;bodyPointAY=headPointY+headRadius; 
			bodyPointBX=bodyPointAX+ori*3;bodyPointBY=bodyPointAY+18;
			bodyPointCX=bodyPointAX+ori*3;bodyPointCY=bodyPointAY+40;
			// Arms
			leftArmPointAX=bodyPointAX-ori*3;leftArmPointAY=bodyPointAY+18;
			leftArmPointBX=leftArmPointAX-ori*3;leftArmPointBY=leftArmPointAY+25;
			rightArmPointAX=bodyPointAX+ori*7;rightArmPointAY=bodyPointAY+20;
			rightArmPointBX=rightArmPointAX+ori*7;rightArmPointBY=rightArmPointAY+25;
			// Legs
			leftLegPointAX=bodyPointCX+ori*5;leftLegPointAY=bodyPointCY+20;
			leftLegPointBX=leftLegPointAX+ori*3;leftLegPointBY=leftLegPointAY+20;
			rightLegPointAX=bodyPointCX-ori*5;rightLegPointAY=bodyPointCY+20;
			rightLegPointBX=rightLegPointAX-ori*3;rightLegPointBY=rightLegPointAY+20;
			break;
		case 1:
			headPointX=0; headPointY=0; headRadius=20;
			//body
			bodyPointAX=headPointX-ori*12;bodyPointAY=headPointY+headRadius-4;
			bodyPointBX=bodyPointAX-ori*3;bodyPointBY=bodyPointAY+18;
			bodyPointCX=bodyPointAX-ori*3;bodyPointCY=bodyPointAY+40;
			// Arms
			leftArmPointAX=bodyPointAX-ori*20;leftArmPointAY=bodyPointAY-5;
			leftArmPointBX=leftArmPointAX-ori*3;leftArmPointBY=leftArmPointAY-25;
			rightArmPointAX=bodyPointAX+ori*18;rightArmPointAY=bodyPointAY+18;
			rightArmPointBX=rightArmPointAX+ori*7;rightArmPointBY=rightArmPointAY+25;
			// Legs
			leftLegPointAX=bodyPointCX+ori*15;leftLegPointAY=bodyPointCY+20;
			leftLegPointBX=leftLegPointAX+ori*3;leftLegPointBY=leftLegPointAY+20;
			rightLegPointAX=bodyPointCX-ori*15;rightLegPointAY=bodyPointCY+20;
			rightLegPointBX=rightLegPointAX-ori*3;rightLegPointBY=rightLegPointAY+20;
			break;
		case 2:
		    headPointX=0; headPointY=0; headRadius=20;
			//body
			bodyPointAX=headPointX-ori*16;bodyPointAY=headPointY+headRadius-8;
			bodyPointBX=bodyPointAX-ori*13;bodyPointBY=bodyPointAY+25;
			bodyPointCX=bodyPointAX-ori*3;bodyPointCY=bodyPointAY+50;
			// Arms
			leftArmPointAX=bodyPointAX-ori*20;leftArmPointAY=bodyPointAY-5;
			leftArmPointBX=leftArmPointAX-ori*3;leftArmPointBY=leftArmPointAY-25;
			rightArmPointAX=bodyPointAX+ori*22;rightArmPointAY=bodyPointAY+18;
			rightArmPointBX=rightArmPointAX+ori*27;rightArmPointBY=rightArmPointAY-25;
			// Legs
			leftLegPointAX=bodyPointCX+ori*10;leftLegPointAY=bodyPointCY+28;
			leftLegPointBX=leftLegPointAX+ori*25;leftLegPointBY=leftLegPointAY+5;
			rightLegPointAX=bodyPointCX-ori*25;rightLegPointAY=bodyPointCY+10;
			rightLegPointBX=rightLegPointAX-ori*3;rightLegPointBY=rightLegPointAY+20;
			break;
		default:
			headPointX=0; headPointY=0; headRadius=20;
			//body
			bodyPointAX=headPointX;bodyPointAY=headPointY+headRadius; 
			bodyPointBX=bodyPointAX+ori*3;bodyPointBY=bodyPointAY+18;
			bodyPointCX=bodyPointAX+ori*3;bodyPointCY=bodyPointAY+40;
			// Arms
			leftArmPointAX=bodyPointAX-ori*3;leftArmPointAY=bodyPointAY+18;
			leftArmPointBX=leftArmPointAX-ori*3;leftArmPointBY=leftArmPointAY+25;
			rightArmPointAX=bodyPointAX+ori*7;rightArmPointAY=bodyPointAY+20;
			rightArmPointBX=rightArmPointAX+ori*7;rightArmPointBY=rightArmPointAY+25;
			// Legs
			leftLegPointAX=bodyPointCX+ori*5;leftLegPointAY=bodyPointCY+20;
			leftLegPointBX=leftLegPointAX+ori*3;leftLegPointBY=leftLegPointAY+20;
			rightLegPointAX=bodyPointCX-ori*5;rightLegPointAY=bodyPointCY+20;
			rightLegPointBX=rightLegPointAX-ori*3;rightLegPointBY=rightLegPointAY+20;
			break;
	}

	var circle = new createjs.Shape();
	circle.graphics.setStrokeStyle(2,2).beginStroke("black");
	circle.graphics.drawCircle(headPointX, headPointY, headRadius);
	circle.setBounds(x+headPointX-headRadius, y+headPointY-headRadius, headRadius*2, headRadius*2);
	container.addChild(circle);
	
	var bodyLine = new createjs.Shape();
	container.addChild(bodyLine);
	bodyLine.graphics.setStrokeStyle(2,1,1).beginStroke("black");
	bodyLine.graphics.moveTo(bodyPointAX, bodyPointAY);
	// Body
	bodyLine.graphics.quadraticCurveTo(bodyPointBX,bodyPointBY, bodyPointCX,bodyPointCY);
	// Arms
	bodyLine.graphics.moveTo(bodyPointAX, bodyPointAY);
	bodyLine.graphics.lineTo(leftArmPointAX,leftArmPointAY);
	bodyLine.graphics.lineTo(leftArmPointBX,leftArmPointBY);
	bodyLine.graphics.moveTo(bodyPointAX, bodyPointAY);
	bodyLine.graphics.lineTo(rightArmPointAX,rightArmPointAY);
	bodyLine.graphics.lineTo(rightArmPointBX,rightArmPointBY);
	// Legs
	bodyLine.graphics.moveTo(bodyPointCX, bodyPointCY);
	bodyLine.graphics.lineTo(leftLegPointAX,leftLegPointAY);
	bodyLine.graphics.lineTo(leftLegPointBX,leftLegPointBY);
	bodyLine.graphics.moveTo(bodyPointCX, bodyPointCY);
	bodyLine.graphics.lineTo(rightLegPointAX,rightLegPointAY);
	bodyLine.graphics.lineTo(rightLegPointBX,rightLegPointBY);
	// Stop drawing this line
	bodyLine.graphics.endStroke();
	
	return container;
}

function getBubble(x,y,message,limit = 18){
	var container = new createjs.Container();
	container.x = x;
	container.y = y;
	
	// Set message
	msgFontSize = 15;
	// todo: a little problem in the limit setting
	msgList = getMsgSplitList(message, limit);
	
	var tmpY = 0;
	for (var i =0; i < msgList.length; i++){
		var tmpMsg = msgList[i];
		var msgText = new createjs.Text(tmpMsg,labelFontSize.toString()+"px xkcd","black");
		msgText.x = 5;
		msgText.y = tmpY;
		container.addChild(msgText);
		tmpY += labelFontSize;
		//console.log(tmpMsg)
	}
	
	return container;
}

function getContainerLine(rectA, rectB){
	console.log(rectA)
	console.log(rectB)
	
	var ptAX = rectA.x + rectA.width/2;
	var ptAY = rectA.y + rectA.height;
	var ptBX = rectB.x + rectB.width/2;
	var ptBY = rectB.y;
	
	var line = new createjs.Shape();
	line.graphics.setStrokeStyle(2,1,1).beginStroke("black");
	line.graphics.moveTo(ptAX, ptAY+5);
	line.graphics.quadraticCurveTo(ptBX,(ptAY+ptBY)/2,ptBX,ptBY-5);
	return line;
}

function render(gest=defaultGest, dist=defaultDist, shad=defaultShad, msgListA, msgListB){
	
	// Get message from text area
	var msgContent = document.getElementById("messageArea").value;
	document.getElementById("textPart").innerHTML = msgContent;
	
	
	// Set the shading of the canvas
	setBackgroundShading(shad);
	
	// Draw the picture on the canvas with the creatjs
	var stage = new createjs.Stage("comicCanvas");
	
	// Draw the border
	var border = new createjs.Shape();
	border.graphics.setStrokeStyle(2).beginStroke("black");
	border.graphics.drawRect(15, 20, 265, 370);
	stage.addChild(border);
	
	// Draw the info label
	var infoLabel = setInfoLabel(10,10,labelMessage);
	stage.addChild(infoLabel);
	
	// Draw the horizon
	var line = new createjs.Shape();
	stage.addChild(line);
	line.graphics.setStrokeStyle(2).beginStroke("black");
	line.graphics.moveTo(15, 340);
	line.graphics.lineTo(280,310);
	
	// Draw the character
	var characterA = setCharacter(100-dist*20,250,1,-1);
	var characterB = setCharacter(200+dist*20,250,2,1);
	stage.addChild(characterA);
	stage.addChild(characterB);
	
	// Add message bubble
	// And draw the lines between bubbles
	var bubbleA = []
	var bubbleB = []
	for (var i = 0;i<msgListA.length;i++){
		bubbleA.push(getBubble(30, 200-50*(i+1),msgListA[i]));
	}
	for (var i = 0;i<bubbleA.length;i++){
		stage.addChild(bubbleA[i]);
	}
	for (var i = 1;i<bubbleA.length;i++){
		stage.addChild(getContainerLine(bubbleA[i-1].getTransformedBounds(),bubbleA[i].getTransformedBounds()))	
	}
	if(bubbleA.length>0){
		stage.addChild(getContainerLine(bubbleA[bubbleA.length-1].getTransformedBounds(),characterA.children[0].getTransformedBounds()))
	}
	
	var bubbleB = []
	for (var i = 0;i<msgListB.length;i++){
		bubbleB.push(getBubble(150, 50*(i+1),msgListB[i]));
	}
	for (var i = 0;i<bubbleB.length;i++){
		stage.addChild(bubbleB[i]);
	}
	for (var i = 1;i<bubbleB.length;i++){
		stage.addChild(getContainerLine(bubbleB[i-1].getTransformedBounds(),bubbleB[i].getTransformedBounds()))	
	}
	if(bubbleB.length>0){
		stage.addChild(getContainerLine(bubbleB[bubbleB.length-1].getTransformedBounds(),characterB.children[0].getTransformedBounds()))
	}
	
	stage.update();
	
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

function saveCanvas(){
	var canvas = document.getElementById("comicCanvas");
    document.getElementById("theimage").src = canvas.toDataURL();
    //Canvas2Image.saveAsJPEG(canvas);
	var dataString = canvas.toDataURL("image/png");
	var link = document.createElement("a");
	link.download = 'image';
	link.href = dataString;
	link.click();
}

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

function setInfoBubble(msg, limit = defaultLimit){
	var infoBubble = document.getElementById("infoBubble");
	infoBubble.innerHTML='';
	// How to redraw the picture?
	var msgSplit = msg.split(" ")
	console.log(msgSplit)
	var count = 0;
	var lineNum = 0;
	var tmpMsg = '';

	while(msgSplit[count]){
		console.log(msgSplit[count])
		if(tmpMsg.length + msgSplit[count].length <= limit){
			tmpMsg += msgSplit[count];
			tmpMsg += ' '
		}
		else{
			//Add a line of message
			var line = document.createElement('tspan');
			line.innerHTML = tmpMsg;
			line.setAttribute('x', '0');
			line.setAttribute('y', lineNum.toString()+'em');
			
			infoBubble.appendChild(line);
			tmpMsg = msgSplit[count]+' ';
			lineNum+=1
		}
		count+=1;
		console.log(tmpMsg)
	}
	if(tmpMsg != ''){
		var line = document.createElement('tspan');
			line.innerHTML = tmpMsg;
			line.setAttribute('x', '0');
			line.setAttribute('y', lineNum.toString()+'em');
			
			infoBubble.appendChild(line);
	}
}
