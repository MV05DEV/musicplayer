let b = document.querySelectorAll(".box")
let textx = true
let pattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let reset = document.querySelector(".reset")
reset.addEventListener("click", () => {
    textx = true
    for (const iterator of b) {
        iterator.querySelector("button").disabled = false
        iterator.querySelector("button").innerHTML = ""
    }
}
)
let game = document.querySelector(".New-Game")
game.addEventListener("click", () => {
    textx = true
    for (const iterator of b) {
        iterator.querySelector("button").disabled = false
        iterator.querySelector("button").innerHTML = ""
    }
}
)
b.forEach(element => {
    element.addEventListener("click", () => {
        if (textx) {
            element.querySelector("button").innerHTML = "X"
            textx = false
        }
        else {
            element.querySelector("button").innerHTML = "O"
            textx = true
        }
        element.querySelector("button").disabled = true;
        checkwinner()
    }
    )
});
const checkwinner = (params) => {
    for (const win of pattern) {
        let val1 = b[win[0]].querySelector("button").innerHTML
        let val2 = b[win[1]].querySelector("button").innerHTML
        let val3 = b[win[2]].querySelector("button").innerHTML
        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 == val3) {
                let c = document.createElement("section")
                c.innerHTML = `Congratulation to the winner ${val1}`
                document.body.append(c)
                game.classList.remove("hide")
                for (const iterator of b) {
                    iterator.querySelector("button").disabled = true
                }
            }
        }
    }
}