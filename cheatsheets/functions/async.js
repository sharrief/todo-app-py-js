// Promise syntax
function sleepFor(seconds) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
  return promise;
}

sleepFor(5).then(() => console.log("sometime later"));
console.log("right now");

/* stdout
right now
sometime later
*/

// Error handling with promises
function dontOverSleep(desiredHoursOfSleep, wakeBy) {
  const promise = new Promise((resolve, reject) => {
    setInterval(function rejectIfTimeToWake() {
      if (Date.now() > wakeBy) reject("Time to wake up!");
    }, 1000);

    const sleepDurationInMs = desiredHoursOfSleep * 1000 * 60 * 60;
    setTimeout(
      () => resolve(`You slept ${desiredHoursOfSleep}!`),
      sleepDurationInMs
    );
  });

  return promise;
}

const alarm = new Date(2024, 12, 25, 6, 30);

dontOverSleep(8, alarm.getMilliseconds())
  .then((message) => console.log(message, "😃"))
  .catch((message) => console.log(message, "🥱"))
  .finally(() => console.log("Time for 🎁"));

// With async/await the code appears more synchronous and you avoid "callback hell"
async function getAGoodNightsRest(desiredHoursOfSleep, wakeBy) {
  const startOfSleep = Date.now();
  while (Date.now() - startOfSleep < desiredHoursOfSleep) {
    // this condition is bad/for example only
    if (Date.now() > wakeBy) throw "Time to wake up!";
  }
  return `You slept ${desiredHoursOfSleep}!`;
}

try {
  const message = await getAGoodNightsRest(8, alarm.getMilliseconds());
  console.log(message, "😃");
} catch (message) {
  console.log(message, "🥱");
} finally {
  console.log("Time for 🎁");
}

// an `async function` returns a Promise, so the following works too
getAGoodNightsRest(8, alarm.getMilliseconds())
  .then((message) => console.log(message, "😃"))
  .catch((message) => console.log(message, "🥱"))
  .finally(() => console.log("Time for 🎁"));
