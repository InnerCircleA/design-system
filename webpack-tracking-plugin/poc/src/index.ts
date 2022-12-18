import printMe from "./print";
import { page  } from "./anotation";  
import { C } from "./lib/components";

// NOTE: this is page module.
page("Main Page"); 

function createExampleDOM() {
    C();

    const element = document.createElement("div");

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(createExampleDOM());
