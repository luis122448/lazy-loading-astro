import { BehaviorSubject } from 'rxjs';

export const renderImage = new BehaviorSubject<number>(0);

const isIntersecting = (entry: IntersectionObserverEntry) =>{
    return entry.isIntersecting;
}

const observer = new IntersectionObserver((entries) =>{
    entries.filter(isIntersecting).forEach(loadImage);
});

const loadImage = (entry : IntersectionObserverEntry) =>{
    const nodo = entry.target;
    
    // unlisten
    observer.unobserve(nodo);
    const container = entry.target;
    const imagen = container.firstChild as HTMLImageElement;
    // const imagen = container.querySelector('img') as HTMLImageElement;
    const url = imagen.dataset.src;
    imagen.src = url as string;
    observer.unobserve(container);
    renderImage.next(renderImage.getValue() + 1)  ;
}

export const registerImage = (image: HTMLDivElement) =>{
    observer.observe(image);
}

export const resetImage = () =>{
    renderImage.next(0);
}