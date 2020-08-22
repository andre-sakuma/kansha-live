<template>
    <div>
        <div class="content">
            <div class="counter">
                <div class="timerSpan"><div><p>EM BREVE!</p></div></div>
                <div class="timer">
                    <div class="monitor">
                        <div class="number"><span class="number">{{ days }}</span></div>
                        <div class="nameTag"><span class="nameTag">dias</span></div>
                    </div>
                    <div class="monitor">
                        <div class="number"><span class="number">{{ hours }}</span></div>
                        <div class="nameTag"><span class="nameTag">horas</span></div>
                    </div>
                    <div class="monitor">
                        <div class="number"><span class="number">{{ minutes }}</span></div>
                        <div class="nameTag"><span class="nameTag">min.</span></div>
                    </div>
                    <div class="monitor">
                        <div class="number"><span class="number">{{ seconds }}</span></div>
                        <div class="nameTag"><span class="nameTag">seg.</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['endtime','trans'] ,
    data: function(){
        return{
            timer:"",
            wordString: {},
            start: "",
            end: "",
            interval: "",
            days:"",
            minutes:"",
            hours:"",
            seconds:"",
            message:"",
            statusType:"",
            statusText: "",
        
        };
    },
    created: function () {
            this.wordString = JSON.parse(this.trans);
        },
    mounted(){
        this.start = new Date().getTime();
        this.end = new Date(this.endtime).getTime();
        // Update the count down every 1 second
        this.timerCount(this.start,this.end);
        this.interval = setInterval(() => {
            this.timerCount(this.start,this.end);
        }, 1000);
    },
    methods: {
        timerCount: function(start,end){
            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = start - now;
            var passTime =  end - now;

            if(distance < 0 && passTime < 0){
                this.message = this.wordString.expired;
                this.statusType = "expired";
                this.statusText = this.wordString.status.expired;
                clearInterval(this.interval);
                return;

            }else if(distance < 0 && passTime > 0){
                this.calcTime(passTime);
                this.message = this.wordString.running;
                this.statusType = "running";
                this.statusText = this.wordString.status.running;

            } else if( distance > 0 && passTime > 0 ){
                this.calcTime(distance); 
                this.message = this.wordString.upcoming;
                this.statusType = "upcoming";
                this.statusText = this.wordString.status.upcoming;
            }
        },
        calcTime: function(dist){
        // Time calculations for days, hours, minutes and seconds
            this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
        }
        
    }

}
</script>

<style scoped>
    .timer{
        display: flex;
    }
    .counter{
        display: flex;
    }
    .number{
        color: #eb3234;
        width: 75px;
        margin: 0 auto;
        font-size: 24px;
        text-align: center;
        font-weight: bold;
    }
    .nameTag{
        color: #eb3234;
        width: 75px;
        margin: 0 auto;
        font-size: 20px;
        text-align: center;
    }
    .timerSpan{
        color: #eb3234;
        font-size: 35px;
        font-weight: bold;
    }
</style>