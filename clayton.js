// ==UserScript==
// @name         Clayton Autoclicker for Stack Game
// @version      1.0
// @author       xorascs
// @match        https://tonclayton.fun/*
// @downloadURL  https://github.com/xorascs/Clayton/raw/main/clayton.js
// @updateURL    https://github.com/xorascs/Clayton/raw/main/clayton.js
// @homepage     https://github.com/xorascs/Clayton
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var gameClicksCount = 200;

    // Simulate an event
    function simulateEvent(element, eventType, eventData) {
        const event = new PointerEvent(eventType, {
            isTrusted: true,
            bubbles: true,
            cancelable: true,
            pointerId: eventData.pointerId || 1,
            width: eventData.width || 1,
            height: eventData.height || 1,
            pressure: eventData.pressure || 0.5,
            clientX: eventData.clientX || 0,
            clientY: eventData.clientY || 0,
            screenX: eventData.screenX || 0,
            screenY: eventData.screenY || 0,
        });
        element.dispatchEvent(event);
    }

    // Simulate click on the canvas
    async function simulateMouseClickOnCanvas() {
        const canvas = document.querySelector('#root > div > div.game-layout > div > div > div:nth-child(1) > div > canvas');
        const gameSessionDiv = document.querySelector('div.go4109123758 > div > span');
        const loadingDiv = document.querySelector('div.greeting');
        const continueGame = document.querySelector('div.tap-to-restart');
        const clicksCountElement = document.querySelector('div.game_stats > div');
        const clicksCount = isNaN(Number(clicksCountElement?.innerText)) ? 0 : Number(clicksCountElement.innerText);

        if (continueGame) {
          console.log("Clicked on restart button.")
          continueGame.click();
        }

        if (loadingDiv && !gameSessionDiv?.textContent.includes("error")) {
          console.log(`Simulating first click.`);

          gameClicksCount = Math.floor(Math.random() * (155 - 85) + 85);
          console.log("Clicks count for this game is " + gameClicksCount);

          // Define the position for the click
          let eventData = {
              screenX: 396,
              screenY: 640,
              clientX: 227,
              clientY: 90,
              pressure: 0.5,
              pointerId: 1
          };

          simulateEvent(canvas, 'pointerdown', eventData);
          simulateEvent(canvas, 'mousedown', eventData);
          simulateEvent(canvas, 'pointermove', eventData);
          simulateEvent(canvas, 'mousemove', eventData);
          simulateEvent(canvas, 'pointerup', { ...eventData, pressure: 0 });
          simulateEvent(canvas, 'mouseup', { ...eventData, pressure: 0 });
          simulateEvent(canvas, 'click', { ...eventData, pressure: 0 });

          clearInterval(autoClickerInterval);

          let rnd = Math.floor(Math.random() * 5);
          console.log("Random numb: " + rnd);
          if (rnd == 0) {
            setTimeout(() => {
                autoClickerInterval = setInterval(simulateMouseClickOnCanvas, getRandomDelay(770, 800));
            }, getRandomDelay(1000, 1500));
          }
          else {
            setTimeout(() => {
                autoClickerInterval = setInterval(simulateMouseClickOnCanvas, getRandomDelay(770, 800));
            }, getRandomDelay(300, 500));
          }
        }

         if (canvas && !gameSessionDiv?.textContent.includes("error") && !loadingDiv) {
            if (gameClicksCount > clicksCount) {
              console.log(`1. Simulating click. ${gameClicksCount} ${clicksCount}`);

              // Define the position for the click
              let eventData = {
                  screenX: 396,
                  screenY: 640,
                  clientX: 227,
                  clientY: 90,
                  pressure: 0.5,
                  pointerId: 1
              };

              simulateEvent(canvas, 'pointerdown', eventData);
              simulateEvent(canvas, 'mousedown', eventData);
              simulateEvent(canvas, 'pointermove', eventData);
              simulateEvent(canvas, 'mousemove', eventData);
              simulateEvent(canvas, 'pointerup', { ...eventData, pressure: 0 });
              simulateEvent(canvas, 'mouseup', { ...eventData, pressure: 0 });
              simulateEvent(canvas, 'click', { ...eventData, pressure: 0 });
            }
            else {
              console.log(`2. Simulating click. ${gameClicksCount} ${clicksCount}`);
              setTimeout(() => {
                // Define the position for the click
              let eventData = {
                  screenX: 396,
                  screenY: 640,
                  clientX: 227,
                  clientY: 90,
                  pressure: 0.5,
                  pointerId: 1
              };

              simulateEvent(canvas, 'pointerdown', eventData);
              simulateEvent(canvas, 'mousedown', eventData);
              simulateEvent(canvas, 'pointermove', eventData);
              simulateEvent(canvas, 'mousemove', eventData);
              simulateEvent(canvas, 'pointerup', { ...eventData, pressure: 0 });
              simulateEvent(canvas, 'mouseup', { ...eventData, pressure: 0 });
              simulateEvent(canvas, 'click', { ...eventData, pressure: 0 });
              },1000);
            }
        } else if (gameSessionDiv?.textContent.includes("error")) {
            console.log('Auto clicker paused for 2-3 minutes due to active game session.');
            clearInterval(autoClickerInterval);
            setTimeout(() => {
                autoClickerInterval = setInterval(simulateMouseClickOnCanvas, getRandomDelay(770, 800));
            }, getRandomDelay(120000, 180000));
        }
    }

    // Generate random delay
    function getRandomDelay(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Start the autoclicker process
    setInterval(() => {
      if (document.querySelector('button.daily-reward-button-primary')) {
        document.querySelector('button.daily-reward-button-primary').click();
        location.reload();
      }
    },3000);

    // Start the autoclicker process with the first click delay
    let autoClickerInterval = setInterval(simulateMouseClickOnCanvas, getRandomDelay(770, 800));

})();
