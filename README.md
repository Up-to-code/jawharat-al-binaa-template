# Urban Stay 

**A Premium Real Estate Booking Platform**

Urban Stay is a bespoke, high-performance web application designed to demonstrate a modern, app-like experience for luxury property rentals. Built with **Next.js 14** and **Tailwind CSS v4**, it focuses on fluid interactivity, advanced animations and a polished user interface.

<img width="2796" height="1513" alt="image" src="https://github.com/user-attachments/assets/70da534e-b943-4087-9d3e-b44be7d5cb42" />


##  Key Features

### 1. Immersive User Experience
*   **Auto-Scroll Carousel**: Property cards feature a custom-built image carousel that automatically glides (right-to-left) on hover, providing a seamless preview without user clicks.
*   **Gesture Controls**: Fully touch-responsive cards allow users to swipe through images manually.
*   **Micro-Interactions**: Hovering over pricing reveals a detailed cost breakdown (total for 3 nights + fees), demonstrating complex state derivation.

### 2. Advanced Map Integration
*   **Dynamic Mapping**: Integrated **Leaflet** maps that dynamically load to avoid Server-Side Rendering (SSR) issues.
*   **Two-Way Sync**: A sophisticated interaction where hovering over a property card highlights its corresponding pin on the map, and vice-versa.

### 3. App-Like Transitions
*   **Shared Element Transitions**: Utilises **Framer Motion's** `layoutId` to create a "magic move" effect, seamlessly transitioning images from the listing grid to the details page hero section.
*   **Staggered Animations**: Elements enter the viewport with orchestrated, GPU-accelerated animations for a premium feel.

### 4. Smart Search & Validation
*   **Intelligent Forms**: The search bar includes date logic (preventing check-out before check-in) and a custom guest counter with maximum occupancy limits.
*   **Robust Validation**: Powered by **Zod** and **React Hook Form** to ensure data integrity and provide real-time feedback.

##  Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@theme` configuration)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Maps**: [React Leaflet](https://react-leaflet.js.org/)
*   **Validation**: [Zod](https://zod.dev/)

##  Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nicola-empower/urban-stay.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:3000` to view the application.

##  Design Philosophy

The design system prioritises a "Crisp White" aesthetic with Teal (`#008080`) and Sunset Orange (`#FF5733`) accents. The UI is optimised for readability and visual hierarchy, ensuring a luxury feel across all devices.

---

*Developed by Nicola Berry*
