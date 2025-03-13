export function colorChange(col, amt) {
    let usePound = false;
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    r = r > 255 ? 255 : r < 0 ? 0 : r;
    let g = ((num >> 8) & 0x00FF) + amt;
    g = g > 255 ? 255 : g < 0 ? 0 : g;
    let b = (num & 0x0000FF) + amt;
    b = b > 255 ? 255 : b < 0 ? 0 : b;

    const newColor = (r << 16) | (g << 8) | b;
    return (usePound ? "#" : "") + newColor.toString(16).padStart(6, '0');
}
