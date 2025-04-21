// Initialize Animate on Scroll
AOS.init();

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add Work Experience
document.getElementById('add-work').addEventListener('click', function() {
    const entry = document.createElement('div');
    entry.className = 'work-entry mb-3';
    entry.innerHTML = `
        <label class="form-label">Company</label>
        <input type="text" class="form-control" name="company[]">
        <label class="form-label">Position</label>
        <input type="text" class="form-control" name="position[]">
        <label class="form-label">Start Date</label>
        <input type="text" class="form-control" name="work-start[]">
        <label class="form-label">End Date</label>
        <input type="text" class="form-control" name="work-end[]">
        <label class="form-label">Description</label>
        <textarea class="form-control" name="work-desc[]" rows="2"></textarea>
    `;
    document.getElementById('work-experience').appendChild(entry);
    updatePreview();
});

// Add Education
document.getElementById('add-education').addEventListener('click', function() {
    const entry = document.createElement('div');
    entry.className = 'education-entry mb-3';
    entry.innerHTML = `
        <label class="form-label">School</label>
        <input type="text" class="form-control" name="school[]">
        <label class="form-label">Degree</label>
        <input type="text" class="form-control" name="degree[]">
        <label class="form-label">Graduation Date</label>
        <input type="text" class="form-control" name="grad-date[]">
    `;
    document.getElementById('education').appendChild(entry);
    updatePreview();
});

// Add Skill
document.getElementById('add-skill').addEventListener('click', function() {
    const entry = document.createElement('div');
    entry.className = 'skill-entry mb-3';
    entry.innerHTML = `
        <label class="form-label">Skill</label>
        <input type="text" class="form-control" name="skill[]">
    `;
    document.getElementById('skills').appendChild(entry);
    updatePreview();
});

// Real-time Preview
function updatePreview() {
    const name = document.getElementById('name').value || 'Your Name';
    const email = document.getElementById('email').value || 'your.email@example.com';
    const phone = document.getElementById('phone').value || '123-456-7890';
    const summary = document.getElementById('summary').value || 'A brief professional summary...';

    const companies = Array.from(document.querySelectorAll('input[name="company[]"]')).map(input => input.value).filter(v => v);
    const positions = Array.from(document.querySelectorAll('input[name="position[]"]')).map(input => input.value).filter(v => v);
    const workStarts = Array.from(document.querySelectorAll('input[name="work-start[]"]')).map(input => input.value).filter(v => v);
    const workEnds = Array.from(document.querySelectorAll('input[name="work-end[]"]')).map(input => input.value).filter(v => v);
    const workDescs = Array.from(document.querySelectorAll('textarea[name="work-desc[]"]')).map(textarea => textarea.value).filter(v => v);

    const schools = Array.from(document.querySelectorAll('input[name="school[]"]')).map(input => input.value).filter(v => v);
    const degrees = Array.from(document.querySelectorAll('input[name="degree[]"]')).map(input => input.value).filter(v => v);
    const gradDates = Array.from(document.querySelectorAll('input[name="grad-date[]"]')).map(input => input.value).filter(v => v);

    const skills = Array.from(document.querySelectorAll('input[name="skill[]"]')).map(input => input.value).filter(v => v);

    let previewHtml = `
        <h2>${name}</h2>
        <p>Email: ${email} | Phone: ${phone}</p>
        <h3>Professional Summary</h3>
        <p>${summary}</p>
    `;

    if (companies.length) {
        previewHtml += `<h3>Work Experience</h3><ul>`;
        companies.forEach((company, i) => {
            previewHtml += `
                <li>
                    <strong>${company}</strong> - ${positions[i] || ''}<br>
                    ${workStarts[i] || ''} - ${workEnds[i] || ''}<br>
                    ${workDescs[i] || ''}
                </li>
            `;
        });
        previewHtml += `</ul>`;
    }

    if (schools.length) {
        previewHtml += `<h3>Education</h3><ul>`;
        schools.forEach((school, i) => {
            previewHtml += `
                <li>
                    <strong>${school}</strong> - ${degrees[i] || ''}<br>
                    ${gradDates[i] || ''}
                </li>
            `;
        });
        previewHtml += `</ul>`;
    }

    if (skills.length) {
        previewHtml += `<h3>Skills</h3><ul>`;
        skills.forEach(skill => previewHtml += `<li>${skill}</li>`);
        previewHtml += `</ul>`;
    }

    document.getElementById('preview').innerHTML = previewHtml;
}

// Add event listeners for real-time updates
document.querySelectorAll('#resume-form input, #resume-form textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Generate PDF
document.getElementById('resume-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;

    const companies = Array.from(document.querySelectorAll('input[name="company[]"]')).map(input => input.value).filter(v => v);
    const positions = Array.from(document.querySelectorAll('input[name="position[]"]')).map(input => input.value).filter(v => v);
    const workStarts = Array.from(document.querySelectorAll('input[name="work-start[]"]')).map(input => input.value).filter(v => v);
    const workEnds = Array.from(document.querySelectorAll('input[name="work-end[]"]')).map(input => input.value).filter(v => v);
    const workDescs = Array.from(document.querySelectorAll('textarea[name="work-desc[]"]')).map(textarea => textarea.value).filter(v => v);

    const schools = Array.from(document.querySelectorAll('input[name="school[]"]')).map(input => input.value).filter(v => v);
    const degrees = Array.from(document.querySelectorAll('input[name="degree[]"]')).map(input => input.value).filter(v => v);
    const gradDates = Array.from(document.querySelectorAll('input[name="grad-date[]"]')).map(input => input.value).filter(v => v);

    const skills = Array.from(document.querySelectorAll('input[name="skill[]"]')).map(input => input.value).filter(v => v);

    let y = 10;
    doc.setFontSize(16);
    doc.text(name || 'Your Name', 10, y);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Email: ${email || ''} | Phone: ${phone || ''}`, 10, y);
    y += 10;

    if (summary) {
        doc.text('Professional Summary', 10, y);
        y += 5;
        doc.text(doc.splitTextToSize(summary, 180), 10, y);
        y += 10 + (Math.ceil(summary.length / 90) * 5);
    }

    if (companies.length) {
        doc.text('Work Experience', 10, y);
        y += 5;
        companies.forEach((company, i) => {
            doc.text(`${company} - ${positions[i] || ''}`, 10, y);
            y += 5;
            doc.text(`${workStarts[i] || ''} - ${workEnds[i] || ''}`, 10, y);
            y += 5;
            doc.text(doc.splitTextToSize(workDescs[i] || '', 180), 10, y);
            y += 10 + (Math.ceil((workDescs[i] || '').length / 90) * 5);
        });
    }

    if (schools.length) {
        doc.text('Education', 10, y);
        y += 5;
        schools.forEach((school, i) => {
            doc.text(`${school} - ${degrees[i] || ''}`, 10, y);
            y += 5;
            doc.text(gradDates[i] || '', 10, y);
            y += 10;
        });
    }

    if (skills.length) {
        doc.text('Skills', 10, y);
        y += 5;
        skills.forEach(skill => {
            doc.text(`- ${skill}`, 10, y);
            y += 5;
        });
    }

    doc.save('resume.pdf');
});
