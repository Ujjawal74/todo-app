let message = document.getElementById("message");
let date = document.getElementById("date");
let submitBtn = document.getElementById("submitBtn");
let allTasks = document.getElementById("allTasks");
let doneBtn = document.getElementsByClassName("doneBtn");
let deleteBtn = document.getElementsByClassName("deleteBtn");

document.addEventListener("click", eventHandler);

async function eventHandler(e) {
  if (e.target.hasAttribute("data-done")) {
    let id = e.target.dataset.done;
    try {
      const res = await fetch("/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.updated == "ok") {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (e.target.hasAttribute("data-del")) {
    let id = e.target.dataset.del;
    try {
      const res = await fetch("/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.deleted == "ok") {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

submitBtn.addEventListener("click", async function () {
  let msg = message.value;
  let d = date.value;

  if (msg && d) {
    try {
      let obj = { message: msg, date: d };
      const res = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data = await res.json();
      if (data.status == "ok") {
        message.value = "";
        date.value = "";
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please fill the fields properly");
  }
});
