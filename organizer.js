const tbody = document.getElementById('participantRows');
const participants = JSON.parse(localStorage.getItem('participants') || '[]');
const technicalParticipants = participants.filter((p) => p.eventType === 'Technical');

if (!technicalParticipants.length) {
  tbody.innerHTML = '<tr><td colspan="7">No technical participants registered yet.</td></tr>';
} else {
  tbody.innerHTML = technicalParticipants
    .map(
      (p) => `
        <tr>
          <td>${p.registrationId}</td>
          <td>${p.fullName}</td>
          <td>${p.year}</td>
          <td>${p.email}</td>
          <td>${p.mobile}</td>
          <td>${p.college}</td>
          <td>${p.paymentId}</td>
        </tr>
      `
    )
    .join('');
}
