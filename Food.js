class Food
{
    constructor(c,r)
    {
        this.X = Math.floor(random(0,c - 2));
        this.Y = Math.floor(random(0,r - 2));
    }

    isInvalid(snake)
    {
        for(let i=0;i<snake.data.length;i++)
        {
            if(snake.data[i].x == this.X && snake.data[i].y == this.Y)
            {
                return true;
            }
        }
        return false;
    }

}