// Single Page Application Navigation
class SPANavigation {
    constructor() {
        this.currentPage = 'home';
        this.musicContent = null;
        this.artContent = null;
        this.contentContainer = document.getElementById('dynamic-content');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        // Don't pre-load content - load only when needed
    }
    
    setupEventListeners() {
        // Handle navigation clicks
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        console.log('Found navigation links:', navLinks.length);
        
        navLinks.forEach((link, index) => {
            console.log(`Setting up listener for link ${index}:`, link.textContent, link.getAttribute('data-page'));
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const page = link.getAttribute('data-page');
                console.log('Navigation clicked:', page);
                console.log('SPA Navigation instance:', this);
                console.log('Current page before navigation:', this.currentPage);
                this.navigateTo(page);
            });
        });
        
        
        // Direct Music link handler as backup
        const musicLink = document.getElementById('music-link');
        if (musicLink) {
            console.log('Setting up direct Music link handler');
            musicLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Direct Music link clicked');
                this.navigateTo('music');
            });
        }
        
        // Direct Art link handler as backup
        const artLink = document.getElementById('art-link');
        if (artLink) {
            console.log('Setting up direct Art link handler');
            artLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Direct Art link clicked');
                this.navigateTo('art');
            });
        }
        
        // Handle back button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.back-link')) {
                e.preventDefault();
                console.log('Back button clicked');
                this.navigateTo('home');
            }
        });
    }
    
    loadMusicContent() {
        // Check if content container exists
        if (!this.contentContainer) {
            console.error('Content container not found!');
            return;
        }
        
        // Only load if not already loaded
        if (this.musicContent) {
            this.contentContainer.innerHTML = this.musicContent;
            this.contentContainer.style.display = 'block';
            this.contentContainer.style.visibility = 'visible';
            this.contentContainer.style.opacity = '1';
            this.contentContainer.style.position = 'relative';
            this.contentContainer.style.zIndex = '1';
            document.querySelector('main').style.display = 'none';
            this.currentPage = 'music';
            this.attachMusicEventListeners();
            return;
        }
        
        // Show loading state
        this.contentContainer.innerHTML = '<div class="loading">Loading music...</div>';
        
        // Load content asynchronously
        setTimeout(() => {
            console.log('Loading embedded music content...');
            this.musicContent = `
            <div class="music-content">
                <!-- Album Grid -->
                <div class="albums-grid">
                    <div class="album-card" data-album="album1">
                        <div class="album-cover">
                            <img src="images/deathwishII-cover.png" alt="Album 1 Cover" class="cover-image">
                            <div class="play-overlay">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="album-info">
                            <h3 class="album-title">Death Wish II</h3>
                            <p class="album-year">2024</p>
                            <p class="album-type">Album</p>
                        </div>
                        <div class="album-tracks">
                            <div class="track" data-track="track1">
                                <span class="track-number">1</span>
                                <span class="track-title">Waiting For The F**king Phone</span>
                                <span class="track-duration">1:14</span>
                                <button class="play-btn"><i class="fas fa-play"></i></button>
                            </div>
                            <div class="track" data-track="track2">
                                <span class="track-number">2</span>
                                <span class="track-title">Vengeance</span>
                                <span class="track-duration">3:48</span>
                                <button class="play-btn"><i class="fas fa-play"></i></button>
                            </div>
                            <div class="track" data-track="track3">
                                <span class="track-number">3</span>
                                <span class="track-title">Ambush</span>
                                <span class="track-duration">4:43</span>
                                <button class="play-btn"><i class="fas fa-play"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="album-card" data-album="album2">
                        <div class="album-cover">
                            <img src="images/logo-default.png" alt="Album 2 Cover" class="cover-image">
                            <div class="play-overlay">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="album-info">
                            <h3 class="album-title">Urban Symphony</h3>
                            <p class="album-year">2024</p>
                            <p class="album-type">Single</p>
                        </div>
                        <div class="album-tracks">
                            <div class="track" data-track="track4">
                                <span class="track-number">1</span>
                                <span class="track-title">Urban Symphony</span>
                                <span class="track-duration">3:45</span>
                                <button class="play-btn"><i class="fas fa-play"></i></button>
                            </div>
                        </div>
                    </div>

                    <div class="album-card" data-album="album3">
                        <div class="album-cover">
                            <img src="images/logo-dark.png" alt="Album 3 Cover" class="cover-image">
                            <div class="play-overlay">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="album-info">
                            <h3 class="album-title">Creative Flow</h3>
                            <p class="album-year">2023</p>
                            <p class="album-type">Mixtape</p>
                        </div>
                        <div class="album-tracks">
                            <div class="track" data-track="track5">
                                <span class="track-number">1</span>
                                <span class="track-title">Creative Flow</span>
                                <span class="track-duration">2:58</span>
                                <button class="play-btn"><i class="fas fa-play"></i></button>
                            </div>
                            <div class="track" data-track="track6">
                                <span class="track-number">2</span>
                                <span class="track-title">Midnight Vibes</span>
                                <span class="track-duration">4:15</span>
                                <button class="play-btn"><i class="fas fa-play"></i></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Platform Links -->
                <div class="music-links">
                    <a href="#" class="platform-link">SPOTIFY</a>
                    <a href="#" class="platform-link">SOUNDCLOUD</a>
                    <a href="#" class="platform-link">BANDCAMP</a>
                    <a href="#" class="platform-link">APPLE MUSIC</a>
                </div>

                <!-- Back to Main Site -->
                <div class="back-link">
                    <a href="#" class="external-link">
                        <i class="fas fa-arrow-left"></i> Back to Main Site
                    </a>
                </div>
            </div>
        `;
            console.log('Music content loaded successfully, length:', this.musicContent.length);
            this.contentContainer.innerHTML = this.musicContent;
            this.contentContainer.style.display = 'block';
            this.contentContainer.style.visibility = 'visible';
            this.contentContainer.style.opacity = '1';
            this.contentContainer.style.position = 'relative';
            this.contentContainer.style.zIndex = '1';
            document.querySelector('main').style.display = 'none';
            this.currentPage = 'music';
            this.attachMusicEventListeners();
        }, 100);
    }
    
    loadArtContent() {
        // Check if content container exists
        if (!this.contentContainer) {
            console.error('Content container not found!');
            return;
        }
        
        // Only load if not already loaded
        if (this.artContent) {
            this.contentContainer.innerHTML = this.artContent;
            this.contentContainer.style.display = 'block';
            this.contentContainer.style.visibility = 'visible';
            this.contentContainer.style.opacity = '1';
            this.contentContainer.style.position = 'relative';
            this.contentContainer.style.zIndex = '1';
            document.querySelector('main').style.display = 'none';
            this.currentPage = 'art';
            this.attachArtEventListeners();
            return;
        }
        
        // Show loading state
        this.contentContainer.innerHTML = '<div class="loading">Loading art...</div>';
        
        // Load content asynchronously
        setTimeout(() => {
            console.log('Loading embedded art content...');
            this.artContent = `
            <div class="art-content">
                <div class="art-header">
                    <h1>Art Gallery</h1>
                    <p>Click on any image to view it larger</p>
                </div>
                
                <!-- Art Grid -->
                <div class="art-gallery">
                    <div class="art-item" data-title="Shibuya" data-description="I must have been on something when I made this, cause I think I might have peaked right here.">
                        <img src="images/art1.png" alt="Shibuya" class="art-image" onerror="this.src='https://via.placeholder.com/400x400/333333/ffffff?text=Digital+Dreams'">
                    </div>
                    
                    <div class="art-item" data-title="Neon Cityscape" data-description="Urban exploration in digital form with vibrant colors and dynamic lighting.">
                        <img src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop" alt="Neon Cityscape" class="art-image">
                    </div>
                    
                    <div class="art-item" data-title="Electric Pulse" data-description="Experimental color study with dynamic energy and flowing forms.">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop" alt="Electric Pulse" class="art-image">
                    </div>
                    
                    <div class="art-item" data-title="Portrait Study" data-description="Detailed portrait study focusing on lighting, shadows, and human expression.">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" alt="Portrait Study" class="art-image">
                    </div>
                    
                    <div class="art-item" data-title="Landscape Vision" data-description="Scenic landscape capturing the beauty of nature with digital painting techniques.">
                        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" alt="Landscape Vision" class="art-image">
                    </div>
                    
                    <div class="art-item" data-title="Concept Art" data-description="Conceptual artwork for a fantasy world, showcasing creative imagination and storytelling.">
                        <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop" alt="Concept Art" class="art-image">
                    </div>
                </div>

                <!-- Back to Main Site -->
                <div class="back-link">
                    <a href="#" class="external-link">
                        <i class="fas fa-arrow-left"></i> Back to Main Site
                    </a>
                </div>
            </div>

            <!-- Art Modal -->
            <div class="art-modal" id="artModal">
                <div class="modal-content">
                    <span class="close-btn" id="closeModal">&times;</span>
                    <div class="modal-image-container">
                        <img class="modal-image" id="modalImage" src="" alt="">
                    </div>
                    <div class="modal-info">
                        <h3 class="modal-title" id="modalTitle"></h3>
                        <p class="modal-description" id="modalDescription"></p>
                    </div>
                </div>
            </div>
        `;
            console.log('Art content loaded successfully, length:', this.artContent.length);
            this.contentContainer.innerHTML = this.artContent;
            this.contentContainer.style.display = 'block';
            this.contentContainer.style.visibility = 'visible';
            this.contentContainer.style.opacity = '1';
            this.contentContainer.style.position = 'relative';
            this.contentContainer.style.zIndex = '1';
            document.querySelector('main').style.display = 'none';
            this.currentPage = 'art';
            this.attachArtEventListeners();
        }, 100);
    }
    
    navigateTo(page) {
        console.log('=== NAVIGATE TO CALLED ===');
        console.log('Navigating to:', page, 'Current page:', this.currentPage);
        console.log('Page type:', typeof page);
        console.log('Current page type:', typeof this.currentPage);
        
        if (page === this.currentPage) {
            console.log('Same page, returning early');
            return;
        }
        
        const mainContent = document.querySelector('.main-content');
        const dynamicContent = document.getElementById('dynamic-content');
        
        console.log('Main content found:', !!mainContent);
        console.log('Dynamic content found:', !!dynamicContent);
        
        if (page === 'home') {
            // Show main content, hide dynamic content
            mainContent.style.display = 'block';
            dynamicContent.style.display = 'none';
            this.currentPage = 'home';
            
            // Update navigation
            this.updateNavigation('home');
            console.log('Switched to home page');
        } else if (page === 'music') {
            // Load music content if not already loaded
            this.loadMusicContent();
            this.updateNavigation('music');
            console.log('Switched to music page');
        } else if (page === 'art') {
            // Load art content if not already loaded
            this.loadArtContent();
            this.updateNavigation('art');
            console.log('Switched to art page');
        }
    }
    
    updateNavigation(activePage) {
        // Set data attribute on body for CSS targeting
        document.body.setAttribute('data-current-page', activePage);
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        if (activePage === 'home') {
            // No active nav item for home
        } else if (activePage === 'music') {
            const musicLink = document.querySelector('.nav-link[data-page="music"]');
            if (musicLink) {
                musicLink.classList.add('active');
            }
        } else if (activePage === 'art') {
            const artLink = document.querySelector('.nav-link[data-page="art"]');
            if (artLink) {
                artLink.classList.add('active');
            }
        }
    }
    
    initializeMusicPage() {
        // Re-initialize any music-specific functionality
        console.log('initializeMusicPage called');
        console.log('Global music player available:', !!window.globalMusicPlayer);
        
        if (window.globalMusicPlayer) {
            console.log('Music page loaded, player ready');
            
            // Add a small delay to ensure content is fully rendered
            setTimeout(() => {
                console.log('Attaching music event listeners after delay...');
                this.attachMusicEventListeners();
            }, 100);
        } else {
            console.error('Global music player not available during music page init');
        }
    }
    
    initializeArtPage() {
        // Re-initialize any art-specific functionality
        console.log('Art page loaded, initializing...');
        console.log('Art gallery found:', !!document.querySelector('.art-gallery'));
        console.log('Art items found:', document.querySelectorAll('.art-item').length);
        
        // Re-attach event listeners to the dynamically loaded content
        this.attachArtEventListeners();
        this.attachModalEventListeners();
    }
    
    attachMusicEventListeners() {
        console.log('attachMusicEventListeners called');
        // Attach play button event listeners to dynamically loaded content
        const playButtons = document.querySelectorAll('.play-btn');
        console.log('Found play buttons:', playButtons.length);
        
        if (playButtons.length === 0) {
            console.error('No play buttons found! This means the music content might not be loaded properly.');
            return;
        }
        
        playButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the track ID from the parent track element
                const trackElement = btn.closest('.track');
                if (trackElement) {
                    const trackId = trackElement.getAttribute('data-track');
                    console.log('Play button clicked for track:', trackId);
                    
                    if (window.globalMusicPlayer && trackId) {
                        window.globalMusicPlayer.playTrack(trackId);
                    }
                }
            });
        });
        
        // Attach album play overlay event listeners
        const albumCovers = document.querySelectorAll('.album-cover');
        console.log('Found album covers:', albumCovers.length);
        
        albumCovers.forEach(cover => {
            cover.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Find the first track in this album
                const albumCard = cover.closest('.album-card');
                if (albumCard) {
                    const firstTrack = albumCard.querySelector('.track');
                    if (firstTrack) {
                        const trackId = firstTrack.getAttribute('data-track');
                        console.log('Album cover clicked, playing first track:', trackId);
                        
                        if (window.globalMusicPlayer && trackId) {
                            window.globalMusicPlayer.playTrack(trackId);
                        }
                    }
                }
            });
        });
    }
    
    attachArtEventListeners() {
        console.log('attachArtEventListeners called');
        
        // Attach click listeners to art items
        const artItems = document.querySelectorAll('.art-item');
        console.log('Found art items:', artItems.length);
        
        artItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const title = item.getAttribute('data-title');
                const description = item.getAttribute('data-description');
                const image = item.querySelector('.art-image');
                
                if (image && title && description) {
                    this.openArtModal({
                        src: image.src,
                        alt: image.alt,
                        title: title,
                        description: description
                    });
                }
            });
        });
    }
    
    
    attachModalEventListeners() {
        // Attach modal close event listener
        const closeModal = document.getElementById('closeModal');
        const artModal = document.getElementById('artModal');
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.closeArtModal();
            });
        }
        
        if (artModal) {
            artModal.addEventListener('click', (e) => {
                if (e.target === artModal) {
                    this.closeArtModal();
                }
            });
        }
    }
    
    openArtModal(artData) {
        const modal = document.getElementById('artModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (modal && modalImage && modalTitle && modalDescription) {
            // Set modal content from the passed data
            modalImage.src = artData.src || '';
            modalImage.alt = artData.alt || '';
            modalTitle.textContent = artData.title || '';
            modalDescription.textContent = artData.description || '';
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    closeArtModal() {
        const modal = document.getElementById('artModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }
    
    attachCategoryEventListeners() {
        // Attach category filter event listeners
        const categoryTags = document.querySelectorAll('.category-tag');
        console.log('Found category tags:', categoryTags.length);
        
        categoryTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const category = tag.getAttribute('data-category');
                console.log('Category clicked:', category);
                
                // Remove active class from all tags
                categoryTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                tag.classList.add('active');
                
                // For now, just log the filter - we can add filtering functionality later
                console.log('Art would be filtered by category:', category);
            });
        });
    }
}

// Initialize SPA navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== SPA NAVIGATION INITIALIZATION ===');
    console.log('Initializing SPA navigation...');
    console.log('DOM fully loaded, checking for navigation elements...');
    
    // Check if navigation elements exist
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    console.log('Navigation links found on load:', navLinks.length);
    navLinks.forEach((link, index) => {
        console.log(`Link ${index}:`, link.textContent, 'data-page:', link.getAttribute('data-page'));
    });
    
    // Small delay to ensure other scripts are loaded
    setTimeout(() => {
        try {
            window.spaNavigation = new SPANavigation();
            console.log('SPA navigation initialized successfully');
        } catch (error) {
            console.error('Error initializing SPA navigation:', error);
        }
        
        // Test navigation immediately
        console.log('Testing navigation...');
        const testLinks = document.querySelectorAll('.nav-link[data-page]');
        console.log('Test links found:', testLinks.length);
        
        // Add a simple test click handler
        testLinks.forEach(link => {
            const originalClick = link.onclick;
            link.onclick = function(e) {
                console.log('TEST CLICK DETECTED on:', this.textContent);
                if (originalClick) originalClick.call(this, e);
            };
        });
    }, 100);
});
