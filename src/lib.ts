function animateSpin(elementid: string, time: number): void {
    let element = document.getElementById(elementid);

    element?.animate([
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(360deg)' }
    ], {
        duration: time,
        easing: 'ease',
    });
}

export { animateSpin };
