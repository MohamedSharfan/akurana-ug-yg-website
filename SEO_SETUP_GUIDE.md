# SEO Setup Guide - Akurana UG & YG Website

## ✅ Already Implemented

### 1. **Meta Tags & Structured Data**
- ✅ Comprehensive meta tags in all pages
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card tags
- ✅ JSON-LD structured data (Organization, Educational Organization)
- ✅ Geo tags for local SEO
- ✅ Mobile optimization tags

### 2. **Technical SEO**
- ✅ Sitemap.xml (dynamic generation)
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Web manifest for PWA
- ✅ Proper favicon implementation
- ✅ Performance optimizations (caching, lazy loading, image optimization)

## 🔧 Action Required

### 1. **Google Search Console Setup**
**Priority: HIGH**

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (yourdomain.com)
3. Verify ownership using one of these methods:
   - **HTML Tag** (Recommended): Copy the verification code and add to `_document.js`:
   ```javascript
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```
   - **Domain DNS**: Add TXT record to your domain DNS
4. Submit your sitemap: `https://yourdomain.com/api/sitemap.xml`
5. Enable URL inspection and request indexing for important pages

### 2. **Update Domain URLs**
**Priority: HIGH**

Replace `https://yourdomain.com` with your actual domain in:
- `/src/pages/_document.js`
- `/src/pages/index.js`
- `/src/pages/posts.js`
- `/src/pages/professionals.js`
- `/src/pages/donate.js`
- `/public/robots.txt`
- `/src/pages/api/sitemap.xml.js`

**Search & Replace:**
```bash
Find: https://yourdomain.com
Replace: https://your-actual-domain.com
```

### 3. **Social Media Setup**
**Priority: MEDIUM**

Update social media links in `/src/pages/index.js`:
```javascript
"sameAs": [
  "https://facebook.com/akuranaugyg",  // Your actual Facebook page
  "https://instagram.com/akuranaugyg", // Your actual Instagram
  "https://linkedin.com/company/akuranaugyg" // If you have LinkedIn
]
```

### 4. **Google Analytics Setup**
**Priority: MEDIUM**

1. Create Google Analytics 4 property
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add to `/src/pages/_document.js` in `<Head>`:

```javascript
{/* Google Analytics */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script dangerouslySetInnerHTML={{
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `
}} />
```

### 5. **Bing Webmaster Tools**
**Priority: LOW-MEDIUM**

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add and verify your site
3. Submit sitemap: `https://yourdomain.com/api/sitemap.xml`

### 6. **Create High-Quality Content**
**Priority: HIGH**

- ✅ Add regular blog posts/news updates
- ✅ Include relevant keywords naturally
- ✅ Use descriptive titles and headings
- ✅ Add alt text to images
- ✅ Create engaging meta descriptions

### 7. **Build Backlinks**
**Priority: MEDIUM**

- Submit to educational directories in Sri Lanka
- Partner with universities and educational institutions
- Get featured in local news/educational websites
- Social media engagement and shares
- Guest posting on relevant blogs

### 8. **Local SEO Enhancement**
**Priority: HIGH for local visibility**

1. Create Google Business Profile
2. List in local directories:
   - Sri Lankan educational directories
   - Youth organization listings
   - Local community websites

### 9. **Performance Monitoring**

Track these metrics:
- Google PageSpeed Insights score (aim for 90+)
- Core Web Vitals (LCP, FID, CLS)
- Search Console impressions and clicks
- Bounce rate and engagement

## 📊 SEO Best Practices Checklist

### On-Page SEO
- [x] Title tags (50-60 characters)
- [x] Meta descriptions (150-160 characters)
- [x] Header hierarchy (H1, H2, H3)
- [x] Internal linking
- [x] Mobile responsiveness
- [x] Fast loading speed
- [x] HTTPS enabled
- [x] Structured data
- [x] Image optimization

### Off-Page SEO
- [ ] Backlink building
- [ ] Social media presence
- [ ] Online reputation management
- [ ] Guest posting
- [ ] Community engagement

### Technical SEO
- [x] XML sitemap
- [x] Robots.txt
- [x] Canonical URLs
- [x] 404 error handling
- [x] Page speed optimization
- [x] Mobile-first design
- [x] Schema markup

## 🎯 Keywords to Target

### Primary Keywords:
- "student mentorship Sri Lanka"
- "career guidance programs Sri Lanka"
- "O/L guidance Akurana"
- "A/L guidance Sri Lanka"
- "undergraduate community Sri Lanka"

### Secondary Keywords:
- "free education support Sri Lanka"
- "youth empowerment programs"
- "professional networking students"
- "exam preparation help"
- "career development Sri Lanka"

### Long-tail Keywords:
- "free mentorship programs for students in Sri Lanka"
- "how to get career guidance in Akurana"
- "O/L exam preparation help near me"
- "undergraduate professional networking opportunities"

## 📈 Expected Results Timeline

- **Week 1-2**: Search engines start crawling your site
- **Month 1**: Site appears in search results for branded terms
- **Month 2-3**: Rankings improve for secondary keywords
- **Month 3-6**: Significant traffic increase for targeted keywords
- **Month 6+**: Established authority in your niche

## 🔍 Monitoring Tools

1. **Google Search Console** - Track search performance
2. **Google Analytics** - Monitor traffic and behavior
3. **PageSpeed Insights** - Check performance
4. **Mobile-Friendly Test** - Verify mobile optimization
5. **Rich Results Test** - Validate structured data

## 💡 Pro Tips

1. **Update regularly**: Fresh content signals to search engines
2. **Engage on social media**: Increases brand visibility
3. **Encourage reviews**: Build trust and credibility
4. **Monitor competitors**: Learn from successful strategies
5. **Be patient**: SEO takes time, typically 3-6 months for results

## 📞 Need Help?

If you need assistance with SEO setup:
- Check Google Search Console Help Center
- Join SEO communities on Reddit
- Consider hiring an SEO specialist for advanced optimization

---

**Last Updated**: January 2026
**Status**: Setup Complete - Action Required for Full Optimization
