<template>
	<div class="container">
		<div class="archive-header pt-50">
			<h2 class="font-weight-900">Contact</h2>
			<div class="breadcrumb">
				<a href="index.html">Home</a><span></span>
				Contact
			</div>
			<div class="bt-1 border-color-1 mt-30 mb-50"></div>
		</div>
		<p>Address: 19W 24th Street New York NY 10010 United States</p>

		<div style="height: 400px; width: 100%; position: relative; text-align: right;">
			<div style="height: 400px; width: 100%; overflow: hidden; background: none!important;">
				<iframe width="100%" height="500" title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.715438418307!2d-73.99094687075181!3d40.74306741478797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a4470b3c0d%3A0xd29206f3c548e48d!2s19%20W%2024th%20St%2C%20New%20York%2C%20NY%2010010!5e0!3m2!1sen!2sus!4v1650618578775!5m2!1sen!2sus"></iframe>
			</div>
		</div>

		<p>For the fastest reply, please use the contact form below.</p>

		<form v-on:submit.prevent="contactForm" class="contact-form">
			<div class="contact-form-row">
				<div class="contact-column-6">
					<div class="contact-form-group">
						<label for="contact_name" class="contact-label required">Name</label>
						<input type="text" class="contact-form-input" v-on:keyup="error.name = ''" v-model="form.name"
							name="name" value="" :class="error.name ? 'border-danger' : ''" id="contact_name"
							placeholder="Name">
					</div>
				</div>
				<div class="contact-column-6">
					<div class="contact-form-group">
						<label for="contact_email" class="contact-label required">Email</label>
						<input type="email" class="contact-form-input" v-on:keyup="error.email = ''"
							v-model="form.email" name="email" value="" :class="error.email ? 'border-danger' : ''"
							id="contact_email" placeholder="Email">
					</div>
				</div>
			</div>
			<div class="contact-form-row">
				<div class="contact-column-6">
					<div class="contact-form-group">
						<label for="contact_address" class="contact-label required">Address</label>
						<input type="text" class="contact-form-input" :class="error.address ? 'border-danger' : ''"
							v-on:keyup="error.address = ''" v-model="form.address" name="address" value=""
							id="contact_address" placeholder="Address">
					</div>
				</div>
				<div class="contact-column-6">
					<div class="contact-form-group">
						<label for="contact_phone" class="contact-label required">Phone</label>
						<input type="text" class="contact-form-input" :class="error.phone ? 'border-danger' : ''"
							v-on:keyup="error.phone = ''" v-model="form.phone" name="phone" value="" id="contact_phone"
							placeholder="Phone">
					</div>
				</div>
			</div>
			<div class="contact-form-row">
				<div class="contact-column-12">
					<div class="contact-form-group">
						<label for="contact_subject" class="contact-label required">Subject</label>
						<input type="text" class="contact-form-input" :class="error.subject ? 'border-danger' : ''"
							v-on:keyup="error.subject = ''" v-model="form.subject" name="subject" value=""
							id="contact_subject" placeholder="Subject">
					</div>
				</div>
			</div>
			<div class="contact-form-row">
				<div class="contact-column-12">
					<div class="contact-form-group">
						<label for="contact_content" class="contact-label required">Message</label>
						<textarea name="content" id="contact_content" v-on:keyup="error.message = ''"
							v-model="form.content" class="contact-form-input"
							:class="error.message ? 'border-danger' : ''" rows="5" placeholder="Message"></textarea>
					</div>
				</div>
			</div>
			<div class="contact-form-group">
				<p>The field with (<span style="color:#FF0000;">*</span>) is required.</p>
			</div>
			<div class="contact-form-group">
				<button type="submit" class="contact-button">Send</button>
			</div>
			<div class="contact-form-group">
				<div class="contact-message" v-show="message"
					:class="sent ? 'contact-success-message' : 'contact-error-message'">{{ message }}</div>
			</div>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	layout:'layout',
	name: 'contact',
	data() {
		return {
			form: {
				content: '',
				subject: '',
				phone: '',
				address: '',
				email: '',
				name: ''
			},
			message: '',
			sent: false,
			error: []
		}
	},
	methods: {
		contactForm() {
			let formData = new FormData();
			formData.append('your-message', this.form.content);
			formData.append('your-subject', this.form.subject);
			formData.append('your-phone', this.form.phone);
			formData.append('your-address', this.form.address);
			formData.append('your-email', this.form.email);
			formData.append('your-name', this.form.name);

			axios.post('https://www.newsparho.com/wp-json/contact-form-7/v1/contact-forms/1243/feedback', formData)
				.then((response) => {
					if (response) {
						this.sent = response.data.status == 'mail_sent' ? true : false;
						if (this.sent) {
							this.message = response.data.message;
							this.form.content = ''
							this.form.subject = ''
							this.form.phone = ''
							this.form.address = ''
							this.form.email = ''
							this.form.name = ''
						} else {
							this.message = response.data.message;

							response.data.invalid_fields.forEach(element => {
								if (element.error_id == '-ve-your-name') {
									this.error['name'] = element.message
								}
								if (element.error_id == '-ve-your-email') {
									this.error['email'] = element.message
								}
								if (element.error_id == '-ve-your-subject') {
									this.error['subject'] = element.message
								}
								if (element.error_id == '-ve-your-phone') {
									this.error['phone'] = element.message
								}
								if (element.error_id == '-ve-your-message') {
									this.error['message'] = element.message
								}
								if (element.error_id == '-ve-your-address') {
									this.error['address'] = element.message
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