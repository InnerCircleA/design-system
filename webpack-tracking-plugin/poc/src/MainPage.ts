import { page } from "./anotation";
import { CancelButton, ConfirmButton } from "./lib/components";

page("메인 페이지");
export const MainPage = () => {
    const pageElement = document.createElement("div");
    
    const titleElement = document.createElement("h1");
    titleElement.innerText = "Main 페이지";

    pageElement.appendChild(titleElement);
    pageElement.appendChild(ConfirmButton());
    pageElement.appendChild(CancelButton());
    
    return pageElement; 
}