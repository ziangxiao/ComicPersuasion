//Some default parameters
var defaultLimit = 20
// 3 parameters controlling the different levels of elements
var defaultGest = 0;
var defaultDist = 1;
var defaultShad = 0;

var labelMessage = "One day, your friend tell you...";

function load(){
	render();
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
	// bodyPointB is also the start point of the arms, bodyPointC is the start point of the legs
	var bodyPointAX,bodyPointAY, bodyPointBX,bodyPointBY, bodyPointCX,bodyPointCY;
	// Arms
	var leftArmPointAX,leftArmPointAY, leftArmPointBX,leftArmPointBY;
	var rightArmPointAX,rightArmPointAY, rightArmPointBX,rightArmPointBY;
	// Legs
	var leftLegPointAX,leftLegPointAY, leftLegPointBX,leftLegPointBY;
	var rightLegPointAX,rightLegPointAY, rightLegPointBX,rightLegPointBY;
	
	switch(gest){
		case 1:
			//head
			headPointX=50; headPointY=50; headRadius=20;
			//body
			bodyPointAX=headPointX; bodyPointAY=headPointY+headRadius; 
			bodyPointBX=bodyPointAX+ori*5;bodyPointBY=bodyPointAY+15;
			bodyPointCX=bodyPointAX;bodyPointCY=bodyPointAY+50;
			// Arms
			leftArmPointAX=bodyPointBX-10;leftArmPointAY=bodyPointBY+10;
			leftArmPointBX=leftArmPointAX-10;leftArmPointBY=leftArmPointAY+10;
			rightArmPointAX=bodyPointBX+5;rightArmPointAY=bodyPointBY+10;
			rightArmPointBX=rightArmPointAX+5;rightArmPointBY=rightArmPointAY+10;
			// Legs
			leftLegPointAX=bodyPointCX-16;leftLegPointAY=bodyPointCY+27;
			leftLegPointBX=leftLegPointAX-10;leftLegPointBY=leftLegPointAY-15;
			rightLegPointAX=bodyPointCX+8;rightLegPointAY=bodyPointCY+16;
			rightLegPointBX=rightLegPointAX+8;rightLegPointBY=rightLegPointAY+16;
			break;
		case 2:
		    //head
			headPointX=50; headPointY=50; headRadius=20;
			//body
			bodyPointAX=headPointX; bodyPointAY=headPointY+headRadius; 
			bodyPointBX=bodyPointAX+ori*5;bodyPointBY=bodyPointAY+15;
			bodyPointCX=bodyPointAX;bodyPointCY=bodyPointAY+50;
			// Arms
			leftArmPointAX=bodyPointBX-10;leftArmPointAY=bodyPointBY+10;
			leftArmPointBX=leftArmPointAX-10;leftArmPointBY=leftArmPointAY+10;
			rightArmPointAX=bodyPointBX+5;rightArmPointAY=bodyPointBY+10;
			rightArmPointBX=rightArmPointAX+5;rightArmPointBY=rightArmPointAY+10;
			// Legs
			leftLegPointAX=bodyPointCX-8;leftLegPointAY=bodyPointCY+16;
			leftLegPointBX=leftLegPointAX-8;leftLegPointBY=leftLegPointAY+16;
			rightLegPointAX=bodyPointCX+8;rightLegPointAY=bodyPointCY+16;
			rightLegPointBX=rightLegPointAX+8;rightLegPointBY=rightLegPointAY+16;
			break;
		default:
			//head
			headPointX=50; headPointY=50; headRadius=20;
			//body
			bodyPointAX=headPointX; bodyPointAY=headPointY+headRadius; 
			bodyPointBX=bodyPointAX+ori*5;bodyPointBY=bodyPointAY+15;
			bodyPointCX=bodyPointAX;bodyPointCY=bodyPointAY+50;
			// Arms
			leftArmPointAX=bodyPointBX-10;leftArmPointAY=bodyPointBY+10;
			leftArmPointBX=leftArmPointAX-10;leftArmPointBY=leftArmPointAY+10;
			rightArmPointAX=bodyPointBX+5;rightArmPointAY=bodyPointBY+10;
			rightArmPointBX=rightArmPointAX+5;rightArmPointBY=rightArmPointAY+10;
			// Legs
			leftLegPointAX=bodyPointCX-8;leftLegPointAY=bodyPointCY+16;
			leftLegPointBX=leftLegPointAX-8;leftLegPointBY=leftLegPointAY+16;
			rightLegPointAX=bodyPointCX+8;rightLegPointAY=bodyPointCY+16;
			rightLegPointBX=rightLegPointAX+8;rightLegPointBY=rightLegPointAY+16;
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
	bodyLine.graphics.bezierCurveTo(bodyPointAX, bodyPointAY, bodyPointBX,bodyPointBY, bodyPointCX,bodyPointCY);
	// Arms
	bodyLine.graphics.moveTo(bodyPointAX, bodyPointAY);
	bodyLine.graphics.bezierCurveTo(bodyPointBX, bodyPointBY, leftArmPointAX,leftArmPointAY, leftArmPointBX,leftArmPointBY);
	bodyLine.graphics.moveTo(bodyPointAX, bodyPointAY);
	bodyLine.graphics.bezierCurveTo(bodyPointBX, bodyPointBY, rightArmPointAX,rightArmPointAY, rightArmPointBX,rightArmPointBY);
	// Legs
	bodyLine.graphics.moveTo(bodyPointCX, bodyPointCY);
	bodyLine.graphics.bezierCurveTo(bodyPointCX, bodyPointCY, leftLegPointAX,leftLegPointAY, leftLegPointBX,leftLegPointBY);
	bodyLine.graphics.moveTo(bodyPointCX, bodyPointCY);
	bodyLine.graphics.bezierCurveTo(bodyPointCX, bodyPointCY, rightLegPointAX,rightLegPointAY, rightLegPointBX,rightLegPointBY);	
	// Stop drawing this line
	bodyLine.graphics.endStroke();
	
	return container;
}

function getBubble(x,y,message,limit = 20){
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
		var msgText = new createjs.Text(tmpMsg,labelFontSize.toString()+"px Arial","black");
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

function render(gest=defaultGest, dist=defaultDist, shad=defaultShad){
	
	// Get message from text area
	var msgContent = document.getElementById("messageArea").value;
	document.getElementById("textPart").innerHTML = msgContent;
	var limit = parseInt(document.getElementById("limitArea").value);
	
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
	var characterA = setCharacter(50,200,1,-1);
	var characterB = setCharacter(150,200,0,1);
	stage.addChild(characterA);
	stage.addChild(characterB);
	
	// Add message bubble
	// And draw the lines between bubbles
	var bubbleA = getBubble(30,150,"Yes!!!");
	stage.addChild(bubbleA);
	stage.addChild(getContainerLine(bubbleA.getTransformedBounds(),characterA.children[0].getTransformedBounds()))	
	
	var bubbleB = []
	bubbleB.push(getBubble(150, 50,"Last 2 weeks, "));
	bubbleB.push(getBubble(150, 100,"You went to the gym less than 60% of your friends!!",18));
	for (var i = 0;i<bubbleB.length;i++){
		stage.addChild(bubbleB[i]);
	}
	stage.addChild(getContainerLine(bubbleB[0].getTransformedBounds(),bubbleB[1].getTransformedBounds()))
	console.log(characterB.children[0]);
	stage.addChild(getContainerLine(bubbleB[1].getTransformedBounds(),characterB.children[0].getTransformedBounds()))	
	
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
