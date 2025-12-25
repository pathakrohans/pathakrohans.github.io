document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('#contact-form');
	const status = document.querySelector('#contact-status');

	if (!form) return;

	const endpoint = 'https://formsubmit.co/ajax/rp676@cornell.edu';
	const submitButton = form.querySelector('input[type="submit"]');

	const setStatus = (state, message) => {
		if (!status) return;
		status.textContent = message;
		status.classList.remove('is-success', 'is-error', 'is-pending');

		if (!message) {
			status.setAttribute('hidden', '');
			return;
		}

		status.removeAttribute('hidden');
		status.classList.add(`is-${state}`);
	};

	form.addEventListener('submit', async function (event) {
		event.preventDefault();

		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const message = form.message.value.trim();

		if (!name || !email || !message || !email.includes('@')) {
			setStatus('error', 'Please add your name, a valid email, and a message.');
			return;
		}

		setStatus('pending', 'Sending your message...');
		if (submitButton) submitButton.disabled = true;

		const formData = new FormData(form);

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});

			if (!response.ok) throw new Error('Form submission failed');

			setStatus('success', 'Thanks! Your message is on its way.');
			form.reset();
		} catch (error) {
			console.error(error);
			setStatus('error', 'Something went wrong. Please try again or email me directly.');
		} finally {
			if (submitButton) submitButton.disabled = false;
		}
	});
});
