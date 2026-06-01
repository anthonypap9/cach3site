class GlobalMusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = null;
        this.currentTrackIndex = 0;
        this.trackList = [];
        this.audio = null;
        this.duration = 0;
        this.volume = 0.7;
        this.isMinimized = false;
        
        this.initializePlayer();
        this.setupEventListeners();
        this.populateTrackList();
    }
    
    initializePlayer() {
        this.player = document.getElementById('globalMusicPlayer');
        this.playerCover = document.getElementById('globalPlayerCover');
        this.playerTitle = document.getElementById('globalPlayerTitle');
        this.playerArtist = document.getElementById('globalPlayerArtist');
        this.playPauseBtn = document.getElementById('globalPlayPauseBtn');
        this.prevBtn = document.getElementById('globalPrevBtn');
        this.nextBtn = document.getElementById('globalNextBtn');
        this.progressFill = document.getElementById('globalProgressFill');
        this.currentTimeEl = document.getElementById('globalCurrentTime');
        this.totalTimeEl = document.getElementById('globalTotalTime');
        this.volumeSlider = document.getElementById('globalVolumeSlider');
        this.volumeIcon = document.querySelector('#globalMusicPlayer .volume-icon');
        this.toggleBtn = document.getElementById('togglePlayerBtn');
        this.closeBtn = document.getElementById('closePlayerBtn');
        
        console.log('Global player elements found:');
        console.log('- Player:', !!this.player);
        console.log('- Play button:', !!this.playPauseBtn);
        console.log('- Volume slider:', !!this.volumeSlider);
        console.log('- Toggle button:', !!this.toggleBtn);
        console.log('- Close button:', !!this.closeBtn);
    }
    
    setupEventListeners() {
        // Player controls
        if (this.playPauseBtn) this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousTrack());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Volume slider
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
        
        // Toggle minimize/maximize
        if (this.toggleBtn) this.toggleBtn.addEventListener('click', () => this.toggleMinimize());
        
        // Close player
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closePlayer());
        
        // Progress bar
        const progressBar = this.player.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                this.seekTo(percentage);
            });
        }
    }
    
    populateTrackList() {
        // Same track list as the music page
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
                cover: 'images/deathwishII-cover.png',
                audio: 'audio/urban-symphony.mp3'
            },
            {
                id: 'track5',
                title: 'Creative Flow',
                artist: 'Your Name',
                duration: '2:58',
                cover: 'images/deathwishII-cover.png',
                audio: 'audio/creative-flow.mp3'
            },
            {
                id: 'track6',
                title: 'Midnight Vibes',
                artist: 'Your Name',
                duration: '4:15',
                cover: 'images/deathwishII-cover.png',
                audio: 'audio/midnight-vibes.mp3'
            }
        ];
    }
    
    showPlayer() {
        this.player.style.display = 'block';
        // Ensure it's not minimized when showing
        this.player.classList.remove('minimized');
        this.isMinimized = false;
        const icon = this.toggleBtn.querySelector('i');
        icon.className = 'fas fa-chevron-down';
        this.toggleBtn.title = 'Minimize Player';
        
        // If music should be playing, ensure it's actually playing
        if (this.isPlaying && this.audio && this.audio.paused) {
            this.audio.play().then(() => {
                console.log('Resumed playback after showing player');
            }).catch(error => {
                console.log('Failed to resume playback:', error);
            });
        }
    }
    
    hidePlayer() {
        this.player.style.display = 'none';
    }
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        this.player.classList.toggle('minimized', this.isMinimized);
        
        const icon = this.toggleBtn.querySelector('i');
        if (this.isMinimized) {
            icon.className = 'fas fa-chevron-up';
            this.toggleBtn.title = 'Maximize Player';
        } else {
            icon.className = 'fas fa-chevron-down';
            this.toggleBtn.title = 'Minimize Player';
        }
    }
    
    closePlayer() {
        this.pause();
        this.hidePlayer();
        localStorage.removeItem('currentTrack');
        localStorage.removeItem('isPlaying');
        localStorage.removeItem('currentTime');
    }
    
    playTrack(trackId) {
        console.log('Global player playTrack called with:', trackId);
        const track = this.trackList.find(t => t.id === trackId);
        if (!track) {
            console.log('Track not found:', trackId);
            return;
        }
        
        // Check if this is the same track that's already playing
        const isSameTrack = this.currentTrack && this.currentTrack.id === trackId;
        
        console.log('Found track:', track);
        this.currentTrack = track;
        this.currentTrackIndex = this.trackList.findIndex(t => t.id === trackId);
        
        // Update player display
        this.playerCover.src = track.cover;
        this.playerTitle.textContent = track.title;
        this.playerArtist.textContent = track.artist;
        this.totalTimeEl.textContent = track.duration;
        
        // Save to localStorage
        localStorage.setItem('currentTrack', JSON.stringify(track));
        localStorage.setItem('isPlaying', 'true');
        
        // Show player if hidden
        console.log('Showing player...');
        this.showPlayer();
        
        // Only start playing if it's a different track or not currently playing
        if (!isSameTrack || !this.isPlaying) {
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
        console.log('Playing...');
            }).catch(error => {
                console.log('Play failed:', error);
            });
        } else {
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    pause() {
        if (this.audio) {
            this.audio.pause();
        }
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        localStorage.setItem('isPlaying', 'false');
        this.stopPlaybackMonitor();
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
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        
        if (this.audio) {
            this.audio.volume = this.volume;
        }
        
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
    
    simulatePlayback() {
        // Only create audio if it doesn't exist or if we're switching tracks
        if (!this.audio || this.audio.src !== this.currentTrack.audio) {
            if (this.audio) {
                // Stop current audio before switching
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            
            this.audio = new Audio();
            this.audio.volume = this.volume;
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
            
            this.audio.src = this.currentTrack.audio;
            this.audio.load();
            
            // Store as persistent audio for cross-page continuity
            window.persistentAudio = this.audio;
        }
        
        // Always try to play - this ensures music continues across page navigation
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            console.log('Playing:', this.currentTrack.title);
            // Start the playback monitor to ensure it keeps playing
            this.startPlaybackMonitor();
        }).catch(error => {
            console.log('Audio playback failed for:', this.currentTrack.title);
            console.log('Audio file path:', this.currentTrack.audio);
            console.log('Error:', error);
            // Don't use fallback simulation - just show error
            this.isPlaying = false;
            this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }
    
    // Method to restore audio from saved state
    restoreAudioState() {
        if (this.audio && this.audio.readyState >= 2) {
            // Audio is ready, try to play immediately
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                console.log('Restored audio playback');
                this.startPlaybackMonitor();
            }).catch(error => {
                console.log('Failed to restore audio playback:', error);
                this.isPlaying = false;
                this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            });
        } else {
            // Audio not ready yet, wait and try again
            setTimeout(() => this.restoreAudioState(), 100);
        }
    }
    
    updateProgress() {
        if (this.audio && this.duration > 0) {
            const progress = (this.audio.currentTime / this.duration) * 100;
            this.progressFill.style.width = `${progress}%`;
            
            const minutes = Math.floor(this.audio.currentTime / 60);
            const seconds = Math.floor(this.audio.currentTime % 60);
            this.currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            // Save current time for persistence
            localStorage.setItem('currentTime', this.audio.currentTime.toString());
        }
    }
    
    updateTotalTime() {
        if (this.duration > 0) {
            const minutes = Math.floor(this.duration / 60);
            const seconds = Math.floor(this.duration % 60);
            this.totalTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    startPlaybackMonitor() {
        // Clear any existing monitor
        if (this.playbackMonitor) {
            clearInterval(this.playbackMonitor);
        }
        
        // Check every 2 seconds if audio should be playing but isn't
        this.playbackMonitor = setInterval(() => {
            if (this.isPlaying && this.audio && this.audio.paused && this.audio.readyState >= 2) {
                console.log('Audio paused unexpectedly, resuming...');
                this.audio.play().then(() => {
                    console.log('Successfully resumed playback');
                }).catch(error => {
                    console.log('Failed to resume playback:', error);
                });
            }
        }, 2000);
    }
    
    stopPlaybackMonitor() {
        if (this.playbackMonitor) {
            clearInterval(this.playbackMonitor);
            this.playbackMonitor = null;
        }
    }
    
    
}

// Global audio instance that persists across page loads
window.persistentAudio = null;

// Initialize global music player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing global music player...');
    
    // Always create a new global player instance
    window.globalMusicPlayer = new GlobalMusicPlayer();
    console.log('Global music player created:', window.globalMusicPlayer);
    
    // Music navigation is now handled by SPA navigation
    
    // Check if there's a playing track from previous page
    const savedTrack = localStorage.getItem('currentTrack');
    const isPlaying = localStorage.getItem('isPlaying') === 'true';
    const currentTime = parseFloat(localStorage.getItem('currentTime') || '0');
    
    if (savedTrack) {
        const track = JSON.parse(savedTrack);
        window.globalMusicPlayer.currentTrack = track;
        window.globalMusicPlayer.currentTrackIndex = window.globalMusicPlayer.trackList.findIndex(t => t.id === track.id);
        
        // Update player display
        window.globalMusicPlayer.playerCover.src = track.cover;
        window.globalMusicPlayer.playerTitle.textContent = track.title;
        window.globalMusicPlayer.playerArtist.textContent = track.artist;
        window.globalMusicPlayer.totalTimeEl.textContent = track.duration;
        
        // Show player - DISABLED: Keep hidden until user plays a song
        // window.globalMusicPlayer.showPlayer();
        
        if (isPlaying) {
            // Restore playing state immediately - DISABLED: Keep hidden until user plays a song
            // window.globalMusicPlayer.isPlaying = true;
            // window.globalMusicPlayer.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            
            // Start playback immediately - DISABLED: Keep hidden until user plays a song
            // window.globalMusicPlayer.simulatePlayback();
            
            // Restore playback position
            if (currentTime > 0) {
                // Try multiple times to ensure position is restored
                const restorePosition = () => {
                    if (window.globalMusicPlayer.audio && window.globalMusicPlayer.audio.readyState >= 2) {
                        window.globalMusicPlayer.audio.currentTime = currentTime;
                        console.log('Restored position to:', currentTime);
                    } else {
                        setTimeout(restorePosition, 50);
                    }
                };
                restorePosition();
            }
            
            // Ensure audio continues playing
            setTimeout(() => {
                if (window.globalMusicPlayer.audio && window.globalMusicPlayer.audio.paused) {
                    window.globalMusicPlayer.audio.play().then(() => {
                        console.log('Resumed playback after page load');
                    }).catch(console.log);
                }
            }, 200);
        }
    }
    
    // Handle page visibility changes to maintain audio state
    document.addEventListener('visibilitychange', () => {
        if (window.globalMusicPlayer && window.globalMusicPlayer.audio) {
            if (document.hidden) {
                // Page is hidden, save current state
                localStorage.setItem('currentTime', window.globalMusicPlayer.audio.currentTime.toString());
                localStorage.setItem('isPlaying', window.globalMusicPlayer.isPlaying.toString());
            } else {
                // Page is visible again, restore if needed
                if (window.globalMusicPlayer.isPlaying && window.globalMusicPlayer.audio.paused) {
                    window.globalMusicPlayer.audio.play().catch(console.log);
                }
            }
        }
    });
});
