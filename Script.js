"use strict"
function diceGame(){function e(){I=document.getElementById("numberOfDice").value,n(I)?(document.getElementById("setup").style.display="none",document.getElementById("play").style.display="block",t(I)):(document.getElementById("numberOfDice").focus(),document.getElementById("numberOfDice").value="",document.getElementById("labelNumberOfDice").innerHTML="*You must enter a whole number between 3 and 6",document.getElementById("labelNumberOfDice").style.color="red")}function n(e){return e%1===0&&e>=3&&6>=e}function t(){E++,o()
for(var e=[],n=0;I>n;n++)e.push(Math.floor(6*Math.random()+1))
d(e)}function o(){document.getElementById("round").innerHTML="round: ",document.getElementById("score").innerHTML="score: ",document.getElementById("totalScore").innerHTML="total balance is: "}function l(e){document.getElementById("round").innerHTML="round: "+E,document.getElementById("score").innerHTML="score: "+a(e),document.getElementById("totalScore").innerHTML="total balance is: "+v}function d(e){if(1===E)for(var n=0;n<e.length;n++)document.getElementById(u(n+1)).style.display="block"
r(e)}function r(e){function n(){if(o++,5===o){for(var n=0;n<e.length;n++)document.getElementById(u(n+1)).src=m(e[n])
document.getElementById("continueButton").disabled=!1,document.getElementById("endButton").disabled=!1,l(e),clearInterval(d)}else for(var t=0;t<e.length;t++)document.getElementById(u(t+1)).src=c()}document.getElementById("continueButton").disabled=!0,document.getElementById("endButton").disabled=!0
var t=100,o=0,d=setInterval(n,t)}function c(){var e=Math.floor(6*Math.random()+1)
return"images/dice"+e+".png"}function u(e){return"dice"+e}function m(e){return"images/dice"+e+".png"}function a(e){var n=e.slice(),t=0,o=0,l=0,d=-1,r=-1,c=!0
n.sort(function(e,n){return e-n})
for(var u=0;u<n.length;u++)t+=n[u],n[0]===n[u]&&d++,n[n.length-1]===n[u]&&r++,n[u]==n[u+1]&&(c=!1)
return l=d>=r?d:r,c&&t-n[0]*n.length===(n.length-1)*n.length/2?(console.log("it's a run"),o+=20+t):c?(o+=t,console.log("all numbers differ")):l===n.length-1?(o+=60+t,console.log("bonus all the same")):l===n.length-2&&(o+=40+t,console.log("bonus nearly all the same")),v+=o,console.log(n+"	scores	"+o+"	 matching vlaues"+l),h.push(o),o}function i(){document.getElementById("play").style.display="none",document.getElementById("end").style.display="block",document.getElementById("end").style.height="500px"
var e=v/E
document.getElementById("endRound").innerHTML="Number of Rounds Played: "+E,document.getElementById("endTotal").innerHTML="Total Number of Points: "+v,document.getElementById("endAverage").innerHTML="Average Score: "+e.toFixed(2),s(h)}function s(e){function n(){c.strokeStyle="#fff",c.moveTo(g,y),c.lineTo(g,10),c.stroke(),c.moveTo(g,y),c.lineTo(l+20,y),c.stroke(),c.moveTo(g,y),c.closePath()}function t(){c.strokeStyle="#eee",c.moveTo(g+s,y)
for(var e=l/s+1,n=1;e>n;n++)c.moveTo(g+s*n,y),c.lineTo(g+s*n,10),c.stroke()
c.font="8pt Calibri",c.fillText("Rounds -->",25,290)}function o(e,n){c.strokeStyle="#ff2222",g+=e,y-=i*n,c.lineTo(g,y),c.stroke()}for(var l=270,d=270,r=document.getElementById("myCanvas"),c=r.getContext("2d"),u=e,m=0,a=0;a<u.length;a++)m+=u[a]
var i=d/m,s=l/u.length,g=20,y=280
c.beginPath(),n(),t(),c.beginPath(),c.moveTo(g,y)
for(var f=0;f<u.length;f++)o(s,u[f])}var g=document.getElementById("startButton")
g.addEventListener("click",e)
var y=document.getElementById("numberOfDice")
y.addEventListener("change",e)
var f=document.getElementById("continueButton")
f.addEventListener("click",t)
var B=document.getElementById("endButton")
B.addEventListener("click",i)
var E=0,v=0,I=0,h=[]
document.getElementById("play").style.display="none",document.getElementById("end").style.display="none"}diceGame()
