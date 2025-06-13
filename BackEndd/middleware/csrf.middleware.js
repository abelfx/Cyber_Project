const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// CSRF Protection middleware
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict' // Strict same-site policy
    }
});

// Custom middleware to check CSRF token for non-GET requests
const csrfCheck = (req, res, next) => {
    // Skip CSRF check for GET requests
    if (req.method === 'GET') {
        return next();
    }

    // Skip CSRF check for public endpoints that don't modify state
    const publicEndpoints = ['/api/login', '/api/register'];
    if (publicEndpoints.includes(req.path)) {
        return next();
    }

    // Apply CSRF protection
    csrfProtection(req, res, (err) => {
        if (err) {
            return res.status(403).json({
                message: 'CSRF token validation failed',
                error: 'Invalid or missing CSRF token'
            });
        }
        next();
    });
};

// Middleware to ensure proper CORS settings
const corsProtection = (req, res, next) => {
    // Allow only specific origins
    const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:5500'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
};

// Middleware to prevent state-changing GET requests
const preventStateChangingGet = (req, res, next) => {
    const stateChangingEndpoints = [
        '/api/deleteProduct',
        '/api/logout',
        '/api/login'
    ];

    if (req.method === 'GET' && stateChangingEndpoints.some(endpoint => req.path.startsWith(endpoint))) {
        return res.status(405).json({
            message: 'Method not allowed',
            error: 'GET requests are not allowed for this endpoint'
        });
    }

    next();
};

// Middleware to regenerate session on login
const regenerateSession = (req, res, next) => {
    if (req.path === '/api/login' && req.method === 'POST') {
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Session regeneration failed',
                    error: err.message
                });
            }
            next();
        });
    } else {
        next();
    }
};

module.exports = {
    csrfCheck,
    corsProtection,
    preventStateChangingGet,
    regenerateSession
}; 