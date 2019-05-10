const possiblePlaces = ["Cafe", "Florist", "Bath", "I'm stuck on my back!!?"];

Future(function wheresMyWife(reject, resolve) {
  possiblePlaces.map((place) => {
    setTimeout(resolve("Maybe she's at the... " + place), 3000);
  });
}).fork(console.log);
