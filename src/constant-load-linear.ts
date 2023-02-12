import type { PositionMechanism, VelocityMechanism } from "./mechanism";
import type { MotorConstants } from "./motor";
import { ConstantLoadAngularMechanism } from "./constant-load-angular";

export class ConstantLoadLinearMechanism
  implements PositionMechanism, VelocityMechanism
{
  private equivalentAngularMechanism: ConstantLoadAngularMechanism;

  constructor(
    motorConstants: MotorConstants,
    private readonly voltage: number,
    private readonly radius: number,
    loadForce: number,
    mass: number,
    initialPosition: number,
    initialVelocity: number
  ) {
    this.equivalentAngularMechanism = new ConstantLoadAngularMechanism(
      motorConstants,
      voltage,
      radius * loadForce,
      mass * radius * radius,
      initialPosition / radius,
      initialVelocity / radius
    );
  }

  public position(time: number): number {
    return this.equivalentAngularMechanism.position(time) * this.radius;
  }

  public velocity(time: number): number {
    return this.equivalentAngularMechanism.velocity(time) * this.radius;
  }

  public acceleration(time: number): number {
    return this.equivalentAngularMechanism.acceleration(time) * this.radius;
  }
}
