# Upadhyay Lawz and Consultant

## Current State
Full advocate law firm website with: top info bar (40px fixed), navbar with mobile hamburger menu, hero section with large heading + CTA buttons + office info strip, about section with portrait image + stats grid, practice areas grid, services grid, why choose us grid, courts section, testimonials grid, contact section (info + form), footer 4-column grid, legal disclaimer modal, floating WhatsApp button. Associates page also exists.

The site has some responsive classes (`sm:`, `md:`, `lg:`) but several areas break on phones:
- Top info bar: phone numbers overflow or wrap badly on small screens
- Hero heading: `text-5xl sm:text-6xl md:text-7xl` still too large on 320–375px phones; `pt-40` too much top padding
- Hero CTA row: 3 buttons (`Book Free Consultation`, `Contact Us`, `Learn More`) stack awkwardly; Contact Us button is redundant next to Book Free Consultation on mobile
- Hero office info strip: horizontal layout wraps messily on phones
- WhatsApp floating button: `bottom-6 right-6 w-14 h-14` may overlap content/footer on small screens; should be smaller (`w-11 h-11`) on mobile
- About section: `py-24` too much vertical padding; portrait image overflow on small screens
- All grid sections use `sm:grid-cols-2 lg:grid-cols-3` — acceptable but padding and card spacing needs tightening on mobile
- Contact section: form card has `p-7` — tight on 320px; `grid sm:grid-cols-2` form fields stack fine but need proper spacing
- Footer: `py-14` very tall on mobile; 4-column grid collapses to 2 but still dense
- Legal disclaimer modal: button row `flexWrap` is set but minimum widths (`minWidth: 220px`, `minWidth: 160px`) force horizontal overflow on 320px screens; buttons need to stack vertically on phones
- AssociatesPage hero: `pt-28` needs adjustment for top bar height; `text-5xl sm:text-6xl` heading too large on phones
- General: `container mx-auto px-4` is fine but some sections need `px-3` on very small screens
- Touch targets: some nav links and buttons are too small (below 44px minimum)

## Requested Changes (Diff)

### Add
- CSS media query helpers in `index.css` for very small screens (320px)
- Safe-area padding support for phones with notches: `padding-bottom: env(safe-area-inset-bottom)` on fixed elements

### Modify
- **Top info bar**: On screens < 480px, hide phone numbers and show only address abbreviated + single phone icon that links to call
- **Navbar**: Ensure mobile menu touch targets are min 44px; logo text truncates gracefully; hamburger button is at least 44x44px
- **Hero section**: Reduce `pt-40` to `pt-32` on mobile; heading sizes: `text-3xl sm:text-5xl md:text-7xl`; hide the `Learn More` button on mobile (keep only Book + Contact); office info strip stacks vertically with full width items on mobile
- **WhatsApp button**: `w-11 h-11` on mobile, `w-14 h-14` on md+; move to `bottom-20` on mobile to avoid overlapping bottom nav area; pulse ring scales accordingly
- **About section**: Reduce `py-24` to `py-14 md:py-24`; portrait image gets `max-h-80 object-cover` on mobile; floating credential badge repositioned to not overflow
- **Practice areas / Services / Why Us / Courts grids**: Reduce section padding `py-24` → `py-14 md:py-24`; card padding `p-6` → `p-4 sm:p-6`
- **Courts section**: Supreme Court and High Court feature cards — inner padding `px-8 py-6` → `px-4 py-4 sm:px-8 sm:py-6`; icon + text stack centered on mobile
- **Testimonials**: Card padding `p-7` → `p-5 sm:p-7`
- **Contact section**: Form card padding `p-7` → `p-4 sm:p-7`; contact info column comes second on mobile (form first for better UX)
- **Footer**: Reduce `py-14` → `py-10 md:py-14`; on mobile show only Brand + Contact columns stacked, Quick Links and Practice Areas collapse or show fewer items
- **Legal disclaimer modal**: Button container switches to `flexDirection: column` on screens < 480px; remove fixed `minWidth` constraints; buttons become `width: 100%` on mobile; modal inner padding `padding: 0 32px` → `padding: 0 16px` on mobile; header padding `28px 32px` → `20px 16px` on mobile
- **AssociatesPage**: Hero `pt-28` → `pt-24 sm:pt-28` accounting for 40px info bar + navbar; heading `text-4xl sm:text-6xl`; section padding `py-20` → `py-12 md:py-20`; associate cards `p-7` → `p-5 sm:p-7`

### Remove
- Nothing removed

## Implementation Plan
1. Update `LegalDisclaimerModal` — fix button layout for mobile (stack vertically, remove fixed minWidths, reduce padding on small screens) using inline style logic or className breakpoints
2. Update hero section — fix heading size, top padding, hide Learn More on mobile, fix office strip stacking
3. Update WhatsApp floating button — smaller size on mobile, higher bottom offset
4. Update top info bar — simplify for very small screens
5. Reduce section vertical padding across all sections for mobile
6. Tighten card padding across Practice, Services, Courts, Testimonials, Contact form
7. Fix contact section column order on mobile (form first)
8. Fix footer — reduce padding, stack cleanly on mobile
9. Fix AssociatesPage — heading size, section padding, card padding
10. Add `touch-action: manipulation` to interactive buttons for faster tap response
11. Validate build passes
