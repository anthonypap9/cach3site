// Theme Switcher Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeCircles = document.querySelectorAll('.theme-circle');
    const body = document.body;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    body.setAttribute('data-theme', savedTheme);
    
    // Update active circle
    themeCircles.forEach(circle => {
        circle.classList.remove('active');
        if (circle.getAttribute('data-theme') === savedTheme) {
            circle.classList.add('active');
        }
    });
    
    // Theme switching
    themeCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            const theme = circle.getAttribute('data-theme');
            
            // Remove active class from all circles
            themeCircles.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked circle
            circle.classList.add('active');
            
            // Apply theme
            body.setAttribute('data-theme', theme);
            
            // Save to localStorage
            localStorage.setItem('selectedTheme', theme);
            
            // Track theme change
            trackEvent('theme_change', { theme: theme });
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.content-section, .nav-list, .hero');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Simple typing animation for site title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        const originalText = siteTitle.textContent;
        typeWriter(siteTitle, originalText, 80);
    }
});

// Add subtle parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Simple click effects for links
document.addEventListener('DOMContentLoaded', () => {
    const allLinks = document.querySelectorAll('a');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Add loading animation
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #d3fc03;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="color: #000000; text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(0,0,0,0.3); border-top: 3px solid #000000; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <p style="font-weight: 500;">Loading...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Simple hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.external-link, .platform-link, .social-link, .about-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Simple analytics tracking (you can replace with your preferred analytics)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Add your analytics code here (Google Analytics, etc.)
}

// Track navigation clicks
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', {
                section: this.textContent,
                href: this.getAttribute('href')
            });
        });
    });
});

// Track external link clicks
document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('.external-link, .platform-link, .social-link, .about-link');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('external_link_click', {
                linkText: this.textContent,
                href: this.getAttribute('href')
            });
        });
    });
});

// Music Player Functionality
class MusicPlayer {
    constructor() {
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.trackList = [];
        this.currentTrackIndex = 0;
        
        this.initializePlayer();
        this.setupEventListeners();
        this.populateTrackList();
    }
    
    initializePlayer() {
        this.player = document.getElementById('musicPlayer');
        this.playerCover = document.getElementById('playerCover');
        this.playerTitle = document.getElementById('playerTitle');
        this.playerArtist = document.getElementById('playerArtist');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.totalTimeEl = document.getElementById('totalTime');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeIcon = document.querySelector('.volume-icon');
        
        // Set initial volume
        this.volume = 0.7; // 70% volume
    }
    
    setupEventListeners() {
        // Track play buttons
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const track = e.target.closest('.track');
                const trackId = track.getAttribute('data-track');
                this.playTrack(trackId);
            });
        });
        
        // Album cover play buttons
        document.querySelectorAll('.play-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                const albumCard = e.target.closest('.album-card');
                const firstTrack = albumCard.querySelector('.track');
                const trackId = firstTrack.getAttribute('data-track');
                this.playTrack(trackId);
            });
        });
        
        // Player controls
        if (this.playPauseBtn) this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousTrack());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                if (this.currentTrack) {
                    const newTime = percentage * this.currentTrack.duration;
                    this.seekTo(newTime);
                }
            });
        }
        
        // Volume slider
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
    }
    
    populateTrackList() {
        // Define your tracks here - replace with actual audio URLs
        this.trackList = [
            {
                id: 'track1',
                title: 'Waiting For The F**king Phone',
                artist: 'Your Name',
                duration: '1:14',
                cover: 'images/deathwishII-cover.png',
                audio: 'audio/waiting-for-the-phone.mp3'
            },
            {
                id: 'track2',
                title: 'Vengeance',
                artist: 'Your Name',
                duration: '3:48',
                cover: 'images/deathwishII-cover.png',
                audio: 'audio/vengeance.mp3'
            },
            {
                id: 'track3',
                title: 'Ambush',
                artist: 'Your Name',
                duration: '4:43',
                cover: 'images/deathwishII-cover.png',
                audio: 'audio/ambush.mp3'
            },
            {
                id: 'track4',
                title: 'Urban Symphony',
                artist: 'Your Name',
                duration: '3:45',
                cover: 'images/album2-cover.jpg',
                audio: 'audio/urban-symphony.mp3'
            },
            {
                id: 'track5',
                title: 'Creative Flow',
                artist: 'Your Name',
                duration: '2:58',
                cover: 'images/album3-cover.jpg',
                audio: 'audio/creative-flow.mp3'
            },
            {
                id: 'track6',
                title: 'Midnight Vibes',
                artist: 'Your Name',
                duration: '4:15',
                cover: 'images/album3-cover.jpg',
                audio: 'audio/midnight-vibes.mp3'
            }
        ];
    }
    
    playTrack(trackId) {
        const track = this.trackList.find(t => t.id === trackId);
        if (!track) return;
        
        this.currentTrack = track;
        this.currentTrackIndex = this.trackList.findIndex(t => t.id === trackId);
        
        // Update player display
        this.playerCover.src = track.cover;
        this.playerTitle.textContent = track.title;
        this.playerArtist.textContent = track.artist;
        this.totalTimeEl.textContent = track.duration;
        
        // Update play button states
        this.updatePlayButtons();
        
        // Use global player instead of local player
        if (window.globalMusicPlayer) {
            window.globalMusicPlayer.playTrack(trackId);
        } else {
            // Fallback to local player if global player not available
            this.simulatePlayback();
        }
        
        console.log(`Playing: ${track.title} by ${track.artist}`);
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        if (this.audio) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                this.updatePlayButtons();
                console.log('Playing...');
            }).catch(error => {
                console.log('Play failed:', error);
            });
        } else {
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.updatePlayButtons();
        }
    }
    
    pause() {
        if (this.audio) {
            this.audio.pause();
        }
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.updatePlayButtons();
        console.log('Paused...');
    }
    
    previousTrack() {
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
            const track = this.trackList[this.currentTrackIndex];
            this.playTrack(track.id);
        }
    }
    
    nextTrack() {
        if (this.currentTrackIndex < this.trackList.length - 1) {
            this.currentTrackIndex++;
            const track = this.trackList[this.currentTrackIndex];
            this.playTrack(track.id);
        }
    }
    
    seekTo(percentage) {
        if (this.audio && this.duration > 0) {
            this.audio.currentTime = this.duration * percentage;
        }
        console.log(`Seeking to ${Math.round(percentage * 100)}%`);
    }
    
    updatePlayButtons() {
        document.querySelectorAll('.play-btn').forEach(btn => {
            const track = btn.closest('.track');
            const trackId = track.getAttribute('data-track');
            const icon = btn.querySelector('i');
            
            if (this.currentTrack && this.currentTrack.id === trackId && this.isPlaying) {
                icon.className = 'fas fa-pause';
            } else {
                icon.className = 'fas fa-play';
            }
        });
    }
    
    simulatePlayback() {
        // Create audio element if it doesn't exist
        if (!this.audio) {
            this.audio = new Audio();
            this.audio.volume = this.volume; // Set initial volume
            this.audio.addEventListener('loadedmetadata', () => {
                this.duration = this.audio.duration;
                this.updateTotalTime();
            });
            this.audio.addEventListener('timeupdate', () => {
                this.updateProgress();
            });
            this.audio.addEventListener('ended', () => {
                this.nextTrack();
            });
        }
        
        // Set audio source
        this.audio.src = this.currentTrack.audio;
        this.audio.load();
        
        // Play the audio
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.updatePlayButtons();
            console.log('Playing:', this.currentTrack.title);
        }).catch(error => {
            console.log('Audio playback failed for:', this.currentTrack.title);
            console.log('Audio file path:', this.currentTrack.audio);
            console.log('Error:', error);
            // Don't use fallback simulation - just show error
            this.isPlaying = false;
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
    
    
    updateProgress() {
        if (this.audio && this.duration > 0) {
            const progress = (this.audio.currentTime / this.duration) * 100;
            this.progressFill.style.width = `${progress}%`;
            
            const minutes = Math.floor(this.audio.currentTime / 60);
            const seconds = Math.floor(this.audio.currentTime % 60);
            this.currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    updateTotalTime() {
        if (this.duration > 0) {
            const minutes = Math.floor(this.duration / 60);
            const seconds = Math.floor(this.duration % 60);
            this.totalTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
        
        if (this.audio) {
            this.audio.volume = this.volume;
        }
        
        // Update volume icon based on level
        this.updateVolumeIcon();
        
        console.log(`Volume set to: ${Math.round(this.volume * 100)}%`);
    }
    
    updateVolumeIcon() {
        if (!this.volumeIcon) return;
        
        if (this.volume === 0) {
            this.volumeIcon.className = 'fas fa-volume-mute volume-icon';
        } else if (this.volume < 0.5) {
            this.volumeIcon.className = 'fas fa-volume-down volume-icon';
        } else {
            this.volumeIcon.className = 'fas fa-volume-up volume-icon';
        }
    }
}

// Initialize music player when DOM is loaded (only if music player exists)
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = document.getElementById('musicPlayer');
    if (musicPlayer) {
        new MusicPlayer();
    }
});