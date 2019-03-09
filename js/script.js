let cnt = 0;
const maxNum = 10;
const tr = document.getElementById('test');

//Fetches the random API from the public API and creates a list of 10 random APIs
function getEm() {
  if (cnt >= maxNum) return; // stop

  fetch("https://api.publicapis.org/random")
    .then(data => data.json())
    .then(data => {
      for (list of data.entries) {
        var data = [];
        data.push(list.API);
        data.sort();
        console.log(data)
        tr.innerHTML += `<li>
      <a href="${list.Link}">
        <h1> ${list.API}</h1>
        <p>${list.Description}</p>
      </a>
      </li>`;
        cnt++;
        getEm()
      }
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

getEm()

//Sorting a table

function sortList() {
  var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
  list = document.getElementById("test");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  // Make a loop that will continue until no switching has been done:
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("A");
    // Loop through all list-items:
    for (i = 0; i < (b.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should switch place with the current item,
      based on the sorting direction (asc or desc): */
      if (dir == "asc") {
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
          /* If next item is alphabetically higher than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
      // Each time a switch is done, increase switchcount by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
