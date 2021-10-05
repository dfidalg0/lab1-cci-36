const instructions = document.getElementById('instructions');

export function toggle() {
    const classes = instructions.classList;

    if (classes.contains('hidden')) {
        classes.remove('hidden');
    }
    else {
        classes.add('hidden');
    }
}
