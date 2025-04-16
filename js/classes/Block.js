class Block {
    constructor({ position, width, height }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = '#4CAF50'; // Green platform color
    }

    draw() {
        // Platform top
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        // Platform edge effect
        c.fillStyle = '#388E3C';
        c.fillRect(this.position.x, this.position.y, this.width, 5);
    }
}