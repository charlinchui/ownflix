export const createSVGElement = (svgPath, parent, id) =>{
    fetch(svgPath)
    .then(res => res.text())
    .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = doc.documentElement;
        svgElement.id = id;
        parent.appendChild(svgElement);
    })
    .catch(e => {
        console.error('Error loading SVG:', e);
    })
}