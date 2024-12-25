function calculateFitness() {
    const name = document.getElementById('name').value;
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    const downloadbtn = document.getElementById('downloadbtn')
    downloadbtn.style.display = "inline-block";  
      if (height > 0 && weight > 0 && age > 0) {
      // BMI Calculation
      const bmi = (weight / (height * height)).toFixed(2);
      let bmiCategory = '';
      let bmiAdvice = '';
      if (bmi < 18.5) {
        bmiCategory = 'Underweight';
        bmiAdvice = 'Increase your calorie and protein intake.';
      } else if (bmi < 24.9) {
        bmiCategory = 'Normal';
        bmiAdvice = 'Your BMI is healthy. Maintain your current lifestyle.';
      } else if (bmi < 29.9) {
        bmiCategory = 'Overweight';
        bmiAdvice = 'Exercise regularly and follow a balanced diet.';
      } else {
        bmiCategory = 'Obese';
        bmiAdvice = 'Consult a doctor and increase physical activity.';
      }
  
      // BMR Calculation
      const bmr = gender === 'male'
        ? 10 * weight + 6.25 * (height * 100) - 5 * age + 5
        : 10 * weight + 6.25 * (height * 100) - 5 * age - 161;
      const calorieNeed = (bmr * activity).toFixed(2);
  
      // Macronutrient Breakdown (approximate)
      const protein = (weight * 2); // 2g per kg body weight
      const fat = (weight * 1); // 1g per kg body weight
      const carbs = (calorieNeed - (protein * 4 + fat * 9)); // Calculating carbs from remaining calories
  
      // Body Fat Percentage Estimation (using a rough estimate for simplicity)
      const bodyFat = (weight * 0.25); // Rough estimate, 25% body fat for most individuals
  
      // Target Heart Rate Calculation
      const targetHeartRate = (220 - age).toFixed(2);
  
      // Water Intake Calculation
      const waterIntake = (weight * 0.033).toFixed(2); // 33 ml per kg of body weight
  
      // Ideal Weight Range (using BMI ranges for height)
      const idealWeightMin = (18.5 * height * height).toFixed(2);
      const idealWeightMax = (24.9 * height * height).toFixed(2);
  
      // TDEE (Total Daily Energy Expenditure)
      const tdee = (bmr * activity).toFixed(2);
  
      // VO2 Max Estimation (a basic approximation)
      const vo2Max = (15 * (220 - age) / 100).toFixed(2);
  
      // Workout Plan Generator based on fitness goals
      let workoutPlan = "Try a mix of cardio and strength training 3-4 times per week.";
      if (goal === 'lose') {
        workoutPlan = "For weight loss, focus on high-intensity interval training (HIIT) and strength training.";
      } else if (goal === 'gain') {
        workoutPlan = "For muscle gain, focus on strength training with progressive overload.";
      }
  
      // Display Results
      document.getElementById('bmiResult').innerHTML = `BMI: ${bmi} (${bmiCategory})<br>Advice: ${bmiAdvice}`;
      document.getElementById('bmrResult').innerHTML = `BMR: ${bmr.toFixed(2)} calories/day`;
      document.getElementById('calorieResult').innerHTML = `Calorie Requirement: ${calorieNeed} calories/day`;
      document.getElementById('macronutrientResult').innerHTML = `Macronutrients: <br>Protein: ${protein}g, Fat: ${fat}g, Carbs: ${carbs}g`;
      document.getElementById('bodyFatResult').innerHTML = `Estimated Body Fat: ${bodyFat}kg`;
      document.getElementById('heartRateResult').innerHTML = `Target Heart Rate: ${targetHeartRate} bpm`;
      document.getElementById('waterResult').innerHTML = `Recommended Water Intake: ${waterIntake} liters/day`;
      document.getElementById('idealWeightResult').innerHTML = `Ideal Weight Range: ${idealWeightMin} - ${idealWeightMax} kg`;
      document.getElementById('tdeeResult').innerHTML = `TDEE (Total Daily Energy Expenditure): ${tdee} calories/day`;
      document.getElementById('vo2MaxResult').innerHTML = `VO2 Max Estimate: ${vo2Max} mL/kg/min`;
      document.getElementById('workoutPlanResult').innerHTML = `Suggested Workout Plan: ${workoutPlan}`;
      document.getElementById('progressTrackerResult').innerHTML = `Track your progress regularly to stay motivated!`;
    } else {
      alert('Please enter valid details for height, weight, and age.');
    }
  }
  
  function downloadPDF() {
    const name = document.getElementById('name').value;
    const bmi = document.getElementById('bmiResult').innerText;
    const bmr = document.getElementById('bmrResult').innerText;
    const calorie = document.getElementById('calorieResult').innerText;
    const macronutrients = document.getElementById('macronutrientResult').innerText;
    const bodyFat = document.getElementById('bodyFatResult').innerText;
    const heartRate = document.getElementById('heartRateResult').innerText;
    const water = document.getElementById('waterResult').innerText;
    const idealWeight = document.getElementById('idealWeightResult').innerText;
    const tdee = document.getElementById('tdeeResult').innerText;
    const vo2Max = document.getElementById('vo2MaxResult').innerText;
    const workoutPlan = document.getElementById('workoutPlanResult').innerText;
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Title & Company Name
    doc.setFont("helvetica", "bold");
    doc.text("Fitness Report", 105, 20, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.text("₪ FITNESS CALCULATER ₪", 105, 30, { align: "center" });
  
    // Add User's Name
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${name}`, 20, 40);
  
    // Add Fitness Results
   // Prepare Results
  const results = [
    { label: 'BMI', value: bmi },
    { label: 'BMR', value: bmr },
    { label: 'Calorie Requirement', value: calorie },
    { label: 'Macronutrients', value: macronutrients },
    { label: 'Body Fat', value: bodyFat },
    { label: 'Target Heart Rate', value: heartRate },
    { label: 'Water Intake', value: water },
    { label: 'Ideal Weight Range', value: idealWeight },
    { label: 'TDEE', value: tdee },
    { label: 'VO2 Max Estimate', value: vo2Max },
    { label: 'Suggested Workout Plan', value: workoutPlan }
  ];

  
  let yPos = 50; // Starting position for results
  const lineHeight = 13; // Set line height for spacing

  doc.setFont("helvetica", "normal");

  results.forEach(result => {
    // Check if the text will overflow to the next page
    if (yPos + lineHeight > 280) {
      doc.addPage(); // Add a new page if content overflows
      yPos = 10; // Reset yPos to the top of the new page
    }
    doc.text(`${result.label}: ${result.value}`, 20, yPos);
    yPos += lineHeight; // Increment yPos for the next line
  });

  // Save PDF
  doc.save(`${name}_fitness_report.pdf`);
}
