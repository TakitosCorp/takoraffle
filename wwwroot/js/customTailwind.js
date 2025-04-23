tailwind.config = {
    theme: {
        extend: {
            colors: {
                raffle: {
                    light: '#c085c0',
                    dark: '#3a0059',
                    medium: 'rgba(139, 69, 139, 0.7)',
                    bg: 'rgba(51, 43, 53, 0.95)',
                    hover: '#d9a6d9',
                }
            },
            animation: {
                'pop-in': 'popIn 0.3s ease-out',
                'pop-out': 'popOut 0.3s ease-out forwards',
                'float': 'float 3s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
                'glow': 'glow 2.5s infinite'
            },
            keyframes: {
                popIn: {
                    '0%': {transform: 'scale(0.8)', opacity: '0'},
                    '100%': {transform: 'scale(1)', opacity: '1'}
                },
                popOut: {
                    '0%': {transform: 'scale(1)', opacity: '1'},
                    '100%': {transform: 'scale(0.8)', opacity: '0'}
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px 5px rgba(192, 133, 192, 0.4)' },
                    '50%': { boxShadow: '0 0 25px 10px rgba(192, 133, 192, 0.7)' }
                },
                glow: {
                    '0%, 100%': {
                        textShadow: '0 0 10px rgba(192, 133, 192, 0.6), 0 0 20px rgba(192, 133, 192, 0.4)'
                    },
                    '50%': {
                        textShadow: '0 0 20px rgba(192, 133, 192, 0.8), 0 0 30px rgba(192, 133, 192, 0.6)'
                    }
                }
            },
        }
    }
}