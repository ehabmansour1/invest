document.addEventListener("DOMContentLoaded", () => {
  const investmentForm = document.getElementById("investmentForm");
  const withdrawalForm = document.getElementById("withdrawalForm");
  const topUpForm = document.getElementById("topUpForm");
  const resultArea = document.getElementById("resultArea");
  const dailyEarningsEl = document.getElementById("dailyEarnings");
  const totalEarningsEl = document.getElementById("totalEarnings");
  const paymentMethod = document.getElementById("paymentMethod");
  const cryptoDetails = document.getElementById("cryptoDetails");
  document.getElementById("investmentAmount").addEventListener("input", (e) => {
    const investmentAmount = parseFloat(e.target.value);

    if (investmentAmount >= 10) {
      const dailyProfit = (investmentAmount * 0.1) / 30; // 10% monthly profit, divided by 30 days
      dailyEarningsEl.textContent = `💰 Daily Earnings: $${dailyProfit.toFixed(
        2
      )}`;
    } else {
      dailyEarningsEl.textContent = "⚠️ Minimum investment is $10";
    }
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    observer.observe(element);
  });

  // Timeline animation delays
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // Statistics counter animation
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Animate statistics when they come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.getAttribute("data-value"));
          animateValue(element, 0, endValue, 2000);
          statsObserver.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".statistics-counter").forEach((counter) => {
    statsObserver.observe(counter);
  });
});
