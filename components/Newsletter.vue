<template>
    <form class="form-subcriber mt-30 contact-form" v-on:submit.prevent="submitForm">
        <div class="input-group d-flex">
            <input type="email" name="email" v-on:keyup="error.email = ''" v-model="form.email" class="form-control bg-white font-small" :class="error.email ? 'border-danger': ''" placeholder="Enter your email">
            <button class="btn bg-primary text-white" type="submit">Subscribe</button>
        </div>
        <div class="contact-form-group">
            <div class="contact-message" v-show="message" :class="sent ? 'contact-success-message': 'contact-error-message'">{{message}}</div>
        </div>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Newsletter',
    data() {
        return {
            form: {
                email: '',
            },
            message: '',
            sent: false,
            error:[]
        }
    },
    methods : {
        submitForm(){
            let formData = new FormData();
            formData.append('your-email', this.form.email);

            axios.post('https://www.newsparho.com/wp-json/contact-form-7/v1/contact-forms/20174/feedback', formData)
                .then((response) => {
					if(response){
                        this.sent         = response.data.status == 'mail_sent' ? true : false;
                        if(this.sent){
                            this.message      = response.data.message;
                            this.form.email = ''
                        }else{
                            this.message = response.data.message;
                            response.data.invalid_fields.forEach(element => {
                                console.log(element);
                                if(element.error_id == '-ve-your-email'){
                                    this.error['email'] = element.message
                                }
                            });
                        }
                        setTimeout(() => {
                            this.message = ''
                        }, 5000);
					}
                })
                .catch((error) => {
                     // error.response.status Check status code
                }).finally(() => {
                     //Perform action in always
            });
        }
    }
}
</script>