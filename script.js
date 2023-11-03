var coord = {};
var muxVal = {};
var conn = {};
var src = "";
var dest = ""; 
function toggleInput(led,ip)
{
	if(document.getElementById(led).style.backgroundColor=="red")
	{
		document.getElementById(led).style.backgroundColor = "green";
		if(ip in conn)
		{
			muxVal[conn[ip]] = 0;
			update();
		}
		//document.getElementById(ip).value = "0";
	}
	else
	{
		document.getElementById(led).style.backgroundColor = "red";
		if(ip in conn)
		{
			muxVal[conn[ip]] = 1;
			update();
		}
		//document.getElementById(ip).value = "1";
	}
	//console.log(document.getElementById(ip).value);
}
function toggleOutput(value,led)
{
	if(value==0)
	{
		document.getElementById(led).style.backgroundColor = "green";
	}
	else
	{
		document.getElementById(led).style.backgroundColor = "red";
	}
}
window.onload = function()
{
	var wire_canvas = document.getElementById('wire-canvas');
	var workspaceDiv = document.querySelector('.workspace');
	//console.log(wire_canvas);
	//console.log(workspaceDiv);
	wire_canvas.width = window.innerWidth * 0.82;
	wire_canvas.height = window.innerHeight;
	
	for(var i=1;i<=16;i++)
	{
		coord["ip".concat(i.toString())] = [ 0 , 20+41*(i-1)];
	}
	var j = 0;
	for(var i=16;i>=9;i--)
	{
		coord["p".concat(i.toString())] = [ 410 + 30*j++ , 244];
		muxVal["p".concat(i.toString())] = 0;
	}
	for(var i=1;i<=8;i++)
	{
		coord["p".concat(i.toString())] = [ 410 + 30*(i-1) , 436];
		muxVal["p".concat(i.toString())] = 0;
	}
	for(var i=1;i<=16;i++)
	{
		coord["op".concat(i.toString())] = [ 1120 , 20+40*(i-1)];
	}
	muxVal['p16'] = 1;
	
	var c  = wire_canvas.getContext('2d');
	
	//VCC
	c.beginPath();
	c.moveTo(405,255);
	c.lineTo(390,255);
	c.strokeStyle = '#ff0000';
	c.stroke();
	c.strokeStyle = '#ff0000';
	c.strokeText("VCC",366,258);

	//GND
	c.beginPath();
	c.moveTo(625,425);
	c.lineTo(640,425);
	c.strokeStyle = '#000000';
	c.stroke();
	c.strokeStyle = '#000000';
	c.strokeText("GND",641,428);	

	//console.log(coord);
}
function drawWire(src,dest)
{
	var c  = document.getElementById('wire-canvas').getContext('2d');
	c.beginPath();
	c.moveTo(coord[src][0], coord[src][1]);
	c.lineTo(coord[dest][0], coord[dest][1]);
	c.strokeStyle = '#ff0000';
	c.stroke();
}
function connect(id)
{
	//console.log(id);
	if(src!="")
	{
		dest = id;
		conn[src] = dest;
		conn[dest] = src;
		drawWire(src,dest);
		src = ""; dest = "";
	}
	else
	{
		src = id;
	}
}
function update()
{
	console.log(muxVal);
	
	muxVal["p9"] = (~muxVal["p15"]) & (  ( (~muxVal["p2"])&(~muxVal["p14"])&(muxVal["p10"]) ) | ( (~muxVal["p2"])&(muxVal["p14"])&(muxVal["p11"]) ) | ( (muxVal["p2"])&(~muxVal["p14"])&(muxVal["p12"]) ) | ( (muxVal["p2"])&(muxVal["p14"])&(muxVal["p13"]) )  );	
	
	muxVal["p7"] = (~muxVal["p1"]) & (  ( (~muxVal["p2"])&(~muxVal["p14"])&(muxVal["p6"]) ) | ( (~muxVal["p2"])&(muxVal["p14"])&(muxVal["p5"]) ) | ( (muxVal["p2"])&(~muxVal["p14"])&(muxVal["p4"]) ) | ( (muxVal["p2"])&(muxVal["p14"])&(muxVal["p3"]) )  );	

	if("p9" in conn && conn["p9"].charAt(0)=='o')
	{
		toggleOutput(muxVal["p9"],conn["p9"].replace(/p/g,'l'));
	}
	if("p7" in conn && conn["p7"].charAt(0)=='o')
	{
		toggleOutput(muxVal["p7"],conn["p7"].replace(/p/g,'l'));
	}
}