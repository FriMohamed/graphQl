function drawLine(svg, x1, y1, x2, y2, color, w) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', w);
    svg.appendChild(line);
}

function drawPoint(svg, x, y) {
    const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    point.setAttribute('cx', x);
    point.setAttribute('cy', y);
    point.setAttribute('r', '4');
    point.setAttribute('fill', '#9929ff');
    point.setAttribute("cursor", "pointer");

    point.addEventListener('mouseenter', () => {
        point.labels.forEach(label => {
            label.setAttribute('opacity', 1);
        });
    });

    point.addEventListener('mouseleave', () => {
        point.labels.forEach(label => {
            label.setAttribute('opacity', 0);
        });
    });

    svg.appendChild(point);
    return point;
}

function drawLabel(x, y, text, svg, point, fs) {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x);
    label.setAttribute('y', y);
    label.setAttribute('fill', 'black');
    label.setAttribute('font-size', fs);
    if (!point) label.setAttribute('opacity', 1);
    else label.setAttribute('opacity', 0);
    label.textContent = `${text}`;

    svg.appendChild(label);
    if (point) point.labels.push(label);
}

function drawCircle(svg, cx, cy, r, strokeWidth, strokeColor, fill) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', fill);
    circle.setAttribute('stroke', strokeColor);
    circle.setAttribute('stroke-width', strokeWidth);

    svg.appendChild(circle);
}

function drawText(svg, x, y, data, fs) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('fill', "black");
    text.setAttribute('font-size', fs);
    text.textContent = data
    svg.appendChild(text);
}

function drawPolyline(svg, points) {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', '#9959ff');
    polygon.setAttribute('opacity', '.85');
    polygon.setAttribute('stroke', '#9929ff');
    polygon.setAttribute('stroke-width', 2);
    
    svg.appendChild(polygon);
}

const debounce = (func, wait = 0) => {
    let timeoutID
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            func(...args)
        }, wait)
    }
}

export {debounce, drawLabel, drawLine, drawPoint, drawCircle, drawPolyline, drawText};