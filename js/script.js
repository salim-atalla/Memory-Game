
document.querySelector(".control-buttons span").onclick = () => {
    let name = prompt("Whats your name?");
    document.querySelector(".name span")
        .innerHTML = name === "" || name === null 
            ? "Unknown" 
            : name;
    document.querySelector(".control-buttons").remove();
}


const duration = 1000; // 1s
const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blocksContainer.children);
const orderRange = shuffle([...Array(blocks.length).keys()]);





blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener('click', () => {
        flippeBlock(block);
    });
});



function flippeBlock (block) {
    block.classList.add("flipped");

    let allFlippedBlocks = blocks.filter((block) => {
        return block.classList.contains("flipped");
    });

    if (allFlippedBlocks.length === 2) {
        
        stopClicking();

        if (isMatched(allFlippedBlocks[0], allFlippedBlocks[1])) {
            allFlippedBlocks[0].classList.remove("flipped");
            allFlippedBlocks[1].classList.remove("flipped");

            allFlippedBlocks[0].classList.add("matched");
            allFlippedBlocks[1].classList.add("matched");

        } else {
            setTimeout(() => {
                allFlippedBlocks[0].classList.remove("flipped");
                allFlippedBlocks[1].classList.remove("flipped");
            }, duration);

            let tries = document.querySelector(".tries span");
            tries.textContent = parseInt(tries.textContent) + 1;
        }
    }
}


function stopClicking () {
    blocksContainer.classList.add("stop-click");

    setTimeout(() => {
        blocksContainer.classList.remove("stop-click");
    }, duration);
}

function isMatched (firstBlock, secondBlock) {
    return firstBlock.dataset.tech === secondBlock.dataset.tech;
}


function shuffle (arr) {

    let current = arr.length,
    random, temp;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        // Get number by number from the array
        // Choose randomly another number from the array
        // Do Exchange between those numbers
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
    return arr;
}


