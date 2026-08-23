export const PLACEHOLDER_COVER = 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="#1a1a2e"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#667eea" font-family="sans-serif" font-size="20">تصویر موجود نیست</text></svg>`);

export const handleImageError = (e) => {
  e.target.src = PLACEHOLDER_COVER;
};
