// 1. Typing Animation Logic (Infinite Loop for "KHANT")
const textElement = document.querySelector(".typing-text");
const textToType = "KHANT"; 
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textToType.substring(0, charIndex);
    textElement.textContent = currentText;

    if (!isDeleting && charIndex < textToType.length) {
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        isDeleting = !isDeleting;
        setTimeout(typeEffect, isDeleting ? 1500 : 500);
    }
}
document.addEventListener('DOMContentLoaded', typeEffect);



// 2. Profile Interaction (Home Page)
function toggleProfile() {
    const wrapper = document.getElementById('profileWrapper');
    wrapper.classList.toggle('active');
}

// 3. Skill Cards Interaction (Main Wrapper)
function toggleSkill(element) {
    // Close others if you want only one open at a time
    document.querySelectorAll('.skill-card-wrapper').forEach(el => {
        if (el !== element) el.classList.remove('active');
    });
    element.classList.toggle('active');
}

// 4. Project Modal & Gallery Logic (Updated with Details Text)
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalImgDetail = document.getElementById("modalImgDetail"); // New Element
const closeBtn = document.querySelector(".close-btn");

let currentImages = [];
let currentDetails = []; // Array to hold text
let currentSlideIndex = 0;

document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        document.getElementById("modalTitle").innerText = this.dataset.title;
        document.getElementById("modalDesc").innerText = this.dataset.desc;

        // Parse images
        currentImages = JSON.parse(this.dataset.images);
        
        // Parse text details if they exist, otherwise use empty array
        if (this.dataset.imgDetails) {
            currentDetails = JSON.parse(this.dataset.imgDetails);
        } else {
            currentDetails = []; 
        }

        currentSlideIndex = 0;
        updateGallery();

        modal.style.display = "flex";
    });
});

function updateGallery() {
    modalImg.src = currentImages[currentSlideIndex];
    
    // Update the text below image
    if (currentDetails.length > 0 && currentDetails[currentSlideIndex]) {
        modalImgDetail.style.display = "block";
        modalImgDetail.innerText = currentDetails[currentSlideIndex];
    } else {
        modalImgDetail.style.display = "none";
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= currentImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = currentImages.length - 1;
    updateGallery();
}

closeBtn.onclick = () => modal.style.display = "none";

// 5. Skill Details Modal Logic
const skillModal = document.getElementById("skillModal");
const skillModalTitle = document.getElementById("skillModalTitle");
const skillModalDesc = document.getElementById("skillModalDesc");
const closeSkillBtn = document.querySelector(".close-skill-btn");

// Add click event to all skill items
document.querySelectorAll(".skill-item").forEach(item => {
    item.addEventListener("click", function(e) {
        e.stopPropagation(); 
        
        const title = this.getAttribute("data-title");
        const desc = this.getAttribute("data-desc");

        skillModalTitle.innerText = title;
        skillModalDesc.innerText = desc;
        
        skillModal.style.display = "flex";
    });
});

closeSkillBtn.onclick = () => skillModal.style.display = "none";

// Global Window Click to Close Modals
window.onclick = (e) => { 
    if (e.target == modal) modal.style.display = "none"; 
    if (e.target == skillModal) skillModal.style.display = "none";
}