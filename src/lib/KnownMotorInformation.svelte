<script lang="ts">
  import { knownMotors } from "../motor";
</script>

<table>
  <tr>
    <th>Motor Type</th>
    <th>Stall Torque (N⋅m)</th>
    <th>Free Speed (RPM)</th>
    <th>Voltage (V)</th>
    <th>Stall Current (A)</th>
    <th>Free Current (A)</th>
  </tr>
  {#each knownMotors as [name, motor]}
    <tr>
      <th>{name}</th>
      <th>{motor.stallTorque}</th>
      <th>{((motor.freeSpeed * 60) / (2 * Math.PI)).toFixed(0)}</th>
      <th>{motor.voltage}</th>
      <th>{motor.stallCurrent}</th>
      <th>{motor.freeCurrent}</th>
    </tr>
  {/each}
</table>
