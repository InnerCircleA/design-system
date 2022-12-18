import { page } from "./anotation";
import { CancelButton } from "./lib/components";

page("상세 페이지");
export const DetailPage = () => {
    const pageElement = document.createElement("div");
    
    const titleElement = document.createElement("h1");
    titleElement.innerText = "Detail 페이지";

    pageElement.appendChild(titleElement);

    pageElement.appendChild(CancelButton());
    return pageElement; 
}