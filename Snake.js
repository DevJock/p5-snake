class Snake
{
    constructor(c,r,length)
    {
        this.c = c;
        this.r = r;
        this.X = 0;
        this.Y = 0;
        this.dX = 0;
        this.dY = -1;
        this.data = [];
        this.Dead = false;
        for(let i=1;i<=length;i++)
        {
            this.data[i - 1] = {
                x: Math.floor(this.c/2) - i,
                y: Math.floor(this.r/2)
            }
        }
        this.X = this.data[this.data.length-1].x;
        this.Y = this.data[this.data.length-1].y;
    }

    Move(x,y)
    {
        if(x==0 && y ==0)
        {
            this.x = 0;
            this.y = 0;
            return;
        }
        if(x != 0 && this.dX != 0)
        {
           return;
        }
        if(y != 0 && this.dY != 0)
        {
           return;
        }
        this.dY = y;
        this.dX = x;
    }

    Eat(x,y)
    {
        this.data[this.data.length] = {x:x,y:y};
    }


    CheckMovement()
    {
        if((this.X == 0 && this.dX == -1) || (this.X == this.c -1  && this.dX == 1))
        {
            console.log("X Exception",this.X,this.c);
            return true;
        }

        if((this.Y == 0 && this.dY == -1) || (this.Y == this.r - 1 && this.dY == 1))
        {
            console.log("Y Exception",this.Y,this.r);
            return true;
        }

        for(let i=0;i<this.data.length;i++)
        {
            for(let j=i+1;j<this.data.length;j++)
            {
                if(this.data[i].x == this.data[j].x && this.data[i].y == this.data[j].y)
                {
                    console.log("Snake Exception")
                    return true;
                }
            }
        }
        return false;
    }

    Die()
    {
        this.dX = 0;
        this.dY = 0;
        this.Dead = true;
    }

    Update()
    {
        if(this.Dead)
        {
            return;
        }
        
        if(this.CheckMovement()){
            return true;
        }
        for(let i=0;i<this.data.length-1;i++)
        {
            this.data[i].x = this.data[i+1].x;
            this.data[i].y = this.data[i+1].y;
        }
        this.data[this.data.length-1].x += this.dX;
        this.data[this.data.length-1].y += this.dY;
        this.X = this.data[this.data.length-1].x;
        this.Y = this.data[this.data.length-1].y;
    }
}