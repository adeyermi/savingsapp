const tierDetails = {
  1: { amount: 10000, rate: 0.05 },
  2: { amount: 20000, rate: 0.10 },
  3: { amount: 30000, rate: 0.20 },
};

const form = document.getElementById("registerForm");
const totalSavingsEl = document.getElementById("totalSavings");
const memberList = document.getElementById("memberList");

let members = JSON.parse(localStorage.getItem("members")) || [];


updateDashboard();

// Handle registration form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const tier = document.getElementById("tier").value;

  if (!tierDetails[tier]) return alert("Please select a valid tier.");
  if (members.length >= 12) return alert("Group is full (12 members max).");

  const { amount, rate } = tierDetails[tier];
  const interest = amount * rate;
  const total = amount + interest;

  const newMember = { name, tier, amount, interest, total };
  members.push(newMember);

  saveMembers();
  updateDashboard();
  form.reset();
});

// Update dashboard

function updateDashboard() {
  let totalSavings = 0;
  memberList.innerHTML = "";

  members.forEach((m, i) => {
    totalSavings += m.amount;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${m.name}</td>
      <td>Tier ${m.tier}</td>
      <td>₦${m.amount.toLocaleString()}</td>
      <td>₦${m.interest.toLocaleString()}</td>
      <td>₦${m.total.toLocaleString()}</td>
      <td>
        <button class="withdraw-btn" onclick="withdraw(${i})">Withdraw</button>
      </td>
    `;
    memberList.appendChild(row);
  });

  totalSavingsEl.textContent = totalSavings.toLocaleString();
}

// Withdraw student

function withdraw(index) {
  const member = members[index];
  if (confirm(`${member.name} will withdraw ₦${member.total.toLocaleString()}. Proceed?`)) {
    members.splice(index, 1);
    saveMembers();
    updateDashboard();
  }
}

// Save data to localStorage
function saveMembers() {
  localStorage.setItem("members", JSON.stringify(members));
}
