const box = document.getElementById("counter");
let counter = 10;

startCounting();

function startCounting() {
  setTimeout(countDown, 1000);
  box.innerText = counter;
}

function countDown() {
  counter -= 1;
  box.innerText = counter;

  if (counter === 0) {
    box.innerText = "GO!!";
    close();
    return;
  }
  setTimeout(countDown, 1000);
}
