const form = document.getElementById('registrationForm');
const steps = Array.from(document.querySelectorAll('.form-step'));
const stepBadges = Array.from(document.querySelectorAll('.step'));
const reviewData = document.getElementById('reviewData');
const successBox = document.getElementById('successBox');

let currentStep = 1;

const updateStepView = () => {
  steps.forEach((step) => {
    step.classList.toggle('active', Number(step.dataset.step) === currentStep);
  });

  stepBadges.forEach((badge) => {
    badge.classList.toggle('active', Number(badge.dataset.step) === currentStep);
  });

  if (currentStep === 3) {
    const formData = new FormData(form);
    const fileName = formData.get('paymentPhoto')?.name || 'No file selected';

    reviewData.innerHTML = `
      <p><strong>Name:</strong> ${formData.get('fullName') || '-'}</p>
      <p><strong>Year:</strong> ${formData.get('year') || '-'}</p>
      <p><strong>Email:</strong> ${formData.get('email') || '-'}</p>
      <p><strong>Mobile:</strong> ${formData.get('mobile') || '-'}</p>
      <p><strong>College:</strong> ${formData.get('college') || '-'}</p>
      <p><strong>Event Category:</strong> ${formData.get('eventType') || '-'}</p>
      <p><strong>Payment Option:</strong> ${formData.get('paymentAmount') || '-'}</p>
      <p><strong>Payment ID:</strong> ${formData.get('paymentId') || '-'}</p>
      <p><strong>Payment Photo:</strong> ${fileName}</p>
    `;
  }
};

const validateStep = (stepNumber) => {
  const currentFields = steps
    .find((step) => Number(step.dataset.step) === stepNumber)
    .querySelectorAll('input, select');

  return Array.from(currentFields).every((field) => field.reportValidity());
};

document.addEventListener('click', (event) => {
  const action = event.target.dataset.action;

  if (action === 'next') {
    if (validateStep(currentStep)) {
      currentStep = Math.min(3, currentStep + 1);
      updateStepView();
    }
  }

  if (action === 'prev') {
    currentStep = Math.max(1, currentStep - 1);
    updateStepView();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateStep(3)) return;

  const formData = new FormData(form);
  const registrationId = `ITDE00${Date.now().toString().slice(-5)}`;
  const paymentPhoto = formData.get('paymentPhoto');

  const participant = {
    registrationId,
    fullName: formData.get('fullName'),
    year: formData.get('year'),
    email: formData.get('email'),
    mobile: formData.get('mobile'),
    college: formData.get('college'),
    eventType: formData.get('eventType'),
    paymentAmount: formData.get('paymentAmount'),
    paymentId: formData.get('paymentId'),
    paymentPhotoName: paymentPhoto?.name || ''
  };

  const existing = JSON.parse(localStorage.getItem('participants') || '[]');
  existing.push(participant);
  localStorage.setItem('participants', JSON.stringify(existing));

  successBox.classList.remove('hidden');
  successBox.innerHTML = `
    <strong>Registration successful!</strong><br />
    Your Participant ID: <code>${registrationId}</code>
  `;

  form.reset();
  currentStep = 1;
  updateStepView();
});

updateStepView();
