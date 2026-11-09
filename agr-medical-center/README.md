# AGR Medical Center website

A static, five-page website for AGR Medical Center, Bangalore. It's plain HTML, CSS and a small
script, with no build step and no dependencies.

| Page                      | What it covers                                                               |
| ------------------------- | ---------------------------------------------------------------------------- |
| `index.html`              | Home: the two doctors, what the clinic treats, the lab, visiting consultants |
| `medicine.html`           | General medicine, lungs and sleep, with Dr. Gangi Reddy TK                    |
| `eye-care.html`           | Eye examinations, cataract, retina and vitreous, with Dr. Archana M           |
| `diagnostics.html`        | Every test, who it's for and how to prepare                                  |
| `visit.html`              | Appointment request form (sends via WhatsApp), first-visit steps, contact    |

## Preview locally

```sh
python3 -m http.server 8080 -d agr-medical-center
# then open http://localhost:8080
```

## Deploy

Any static host works: Netlify, Vercel, Cloudflare Pages or GitHub Pages. Set the publish (output)
directory to `agr-medical-center` and leave the build command empty.

## Before launch

Placeholders are marked in the pages with a dotted orange underline. Search and replace them in
every `.html` file:

- [ ] **Phone and WhatsApp.** Replace `+91 80 0000 0000`, `+918000000000` and `918000000000`.
      Also set `CLINIC_WHATSAPP` at the top of `assets/js/site.js`. The booking form sends requests
      to that number.
- [ ] **Address.** Replace `[Street address], [Area]` and `5600XX`, including the structured data
      block in the `<head>` of `index.html`.
- [ ] **Opening hours.** Replace `[Monday to Saturday, opening hours]`.
- [ ] **Directions link.** Swap the Google Maps search link for the clinic's own Maps listing URL.
- [ ] **Qualifications.** Each doctor's page has an HTML comment under the portrait where degrees,
      fellowships and registration numbers can go.
- [ ] **Portraits.** Dr. Archana M's photo shows another hospital's logo on the coat. Replace it with a
      new photo, and use portraits at least 1000 px wide for both doctors so they stay sharp on
      high-resolution screens. Keep the same file names in `assets/img/`.
- [ ] **Domain.** Once the domain is known, make `og:image` an absolute URL and add a
      `<link rel="canonical">` to each page.
- [ ] **Medical copy.** Have both doctors read their pages and the test preparation notes.

## Structure

```
assets/css/site.css   All styles. Colours and type are defined as variables at the top.
assets/js/site.js     Header shadow, mobile menu, booking form → WhatsApp.
assets/fonts/         Newsreader and Albert Sans (self-hosted, SIL Open Font License).
assets/img/           Optimised WebP photos, logo mark (SVG), favicon, social image.
```

The header and footer are repeated in each page. If you change one, change it in all five files.

## Photography

Clinical photos are from Pexels and are free for commercial use under the
[Pexels license](https://www.pexels.com/license/). Attribution isn't required, but the sources are:

- Chest X-ray: [pexels.com/photo/4225923](https://www.pexels.com/photo/doctor-looking-at-scans-of-lungs-4225923/) (Anna Shvets)
- Eye close-up: [pexels.com/photo/34369399](https://www.pexels.com/photo/close-up-of-a-human-eye-with-rich-brown-iris-34369399/) (Nitin Yadav)
- Slit lamp exam: [pexels.com/photo/6749708](https://www.pexels.com/photo/a-man-having-eye-examination-6749708/) (Antoni Shkraba)
- Eye surgery: [pexels.com/photo/31000573](https://www.pexels.com/photo/professional-eye-surgery-in-new-delhi-hospital-31000573/)
- Phoropter: [pexels.com/photo/5752309](https://www.pexels.com/photo/optical-equipment-for-testing-vision-5752309/) (Ksenia Chernaya)
- Blood samples: [pexels.com/photo/6622518](https://www.pexels.com/photo/blood-samples-in-test-tubes-6622518/) (Charlie-Helen Robinson)
- Blood pressure: [pexels.com/photo/7108344](https://www.pexels.com/photo/a-healthcare-worker-measuring-a-patient-s-blood-pressure-using-a-sphygmomanometer-7108344/) (Pavel Danilyuk)
- Pulse oximeter: [pexels.com/photo/7580249](https://www.pexels.com/photo/close-up-of-doctor-putting-a-fingertip-pulse-oximeter-on-a-patients-finger-7580249/)
- Blood sugar test: [pexels.com/photo/6823512](https://www.pexels.com/photo/a-person-s-finger-with-blood-6823512/)
- Sleep: [pexels.com/photo/7641482](https://www.pexels.com/photo/man-lying-on-white-bed-7641482/) (MART PRODUCTION)
