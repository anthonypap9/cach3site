// Art Gallery Functionality
class ArtGallery {
    constructor() {
        this.currentArtIndex = 0;
        this.artItems = [];
        this.filteredItems = [];
        
        this.initializeGallery();
        this.setupEventListeners();
        this.populateArtItems();
    }
    
    initializeGallery() {
        this.modal = document.getElementById('artModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalYear = document.getElementById('modalYear');
        this.closeBtn = document.getElementById('closeModal');
        this.prevBtn = document.getElementById('prevArt');
        this.nextBtn = document.getElementById('nextArt');
    }
    
    setupEventListeners() {
        // Art item clicks
        document.querySelectorAll('.art-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });
        
        // Modal controls
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.prevBtn.addEventListener('click', () => this.previousArt());
        this.nextBtn.addEventListener('click', () => this.nextArt());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Category filtering
        document.querySelectorAll('.category-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const category = tag.getAttribute('data-category');
                this.filterByCategory(category);
                
                // Update active tag
                document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.previousArt();
                } else if (e.key === 'ArrowRight') {
                    this.nextArt();
                }
            }
        });
    }
    
    populateArtItems() {
        // Define your art pieces here
        this.artItems = [
            {
                id: 'art1',
                title: 'Digital Dreams',
                description: 'Abstract digital composition exploring the intersection of technology and creativity',
                year: '2024',
                category: 'digital',
                image: 'images/art1.jpg'
            },
            {
                id: 'art2',
                title: 'Neon Cityscape',
                description: 'Urban exploration in digital form, capturing the energy of city life',
                year: '2024',
                category: 'urban',
                image: 'images/art2.jpg'
            },
            {
                id: 'art3',
                title: 'Electric Pulse',
                description: 'Experimental color study using dynamic gradients and motion',
                year: '2023',
                category: 'experimental',
                image: 'images/art3.jpg'
            },
            {
                id: 'art4',
                title: 'Creative Flow',
                description: 'Fluid motion in digital space, representing the creative process',
                year: '2023',
                category: 'abstract',
                image: 'images/art4.jpg'
            },
            {
                id: 'art5',
                title: 'Midnight Vibes',
                description: 'Dark atmospheric piece exploring themes of solitude and reflection',
                year: '2023',
                category: 'abstract',
                image: 'images/art5.jpg'
            },
            {
                id: 'art6',
                title: 'Urban Symphony',
                description: 'City life in abstract form, celebrating the rhythm of urban existence',
                year: '2022',
                category: 'urban',
                image: 'images/art6.jpg'
            }
        ];
        
        this.filteredItems = [...this.artItems];
    }
    
    openModal(index) {
        this.currentArtIndex = index;
        const art = this.filteredItems[index];
        
        this.modalImage.src = art.image;
        this.modalTitle.textContent = art.title;
        this.modalDescription.textContent = art.description;
        this.modalYear.textContent = art.year;
        
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    previousArt() {
        if (this.currentArtIndex > 0) {
            this.currentArtIndex--;
        } else {
            this.currentArtIndex = this.filteredItems.length - 1;
        }
        this.updateModalContent();
    }
    
    nextArt() {
        if (this.currentArtIndex < this.filteredItems.length - 1) {
            this.currentArtIndex++;
        } else {
            this.currentArtIndex = 0;
        }
        this.updateModalContent();
    }
    
    updateModalContent() {
        const art = this.filteredItems[this.currentArtIndex];
        this.modalImage.src = art.image;
        this.modalTitle.textContent = art.title;
        this.modalDescription.textContent = art.description;
        this.modalYear.textContent = art.year;
        
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        // Show/hide navigation buttons based on number of items
        if (this.filteredItems.length <= 1) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = 'flex';
            this.nextBtn.style.display = 'flex';
        }
    }
    
    filterByCategory(category) {
        if (category === 'all') {
            this.filteredItems = [...this.artItems];
        } else {
            this.filteredItems = this.artItems.filter(art => art.category === category);
        }
        
        // Hide/show art items based on filter
        document.querySelectorAll('.art-item').forEach((item, index) => {
            if (index < this.filteredItems.length) {
                item.style.display = 'block';
                // Update the art item with filtered data
                const art = this.filteredItems[index];
                const img = item.querySelector('.art-image');
                const title = item.querySelector('.art-title');
                const description = item.querySelector('.art-description');
                const year = item.querySelector('.art-year');
                
                img.src = art.image;
                img.alt = art.title;
                title.textContent = art.title;
                description.textContent = art.description;
                year.textContent = art.year;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Reset modal if it's open
        if (this.modal.style.display === 'block') {
            this.currentArtIndex = 0;
            this.updateModalContent();
        }
    }
}

// Initialize art gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtGallery();
});
