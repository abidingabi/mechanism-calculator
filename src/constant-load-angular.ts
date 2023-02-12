import type { PositionMechanism, VelocityMechanism } from "./mechanism";
import type { MotorConstants } from "./motor";

export class ConstantLoadAngularMechanism
  implements PositionMechanism, VelocityMechanism
{
  private readonly a: number;
  private readonly b: number;
  private readonly velocityConstantOfIntegration: number;
  private readonly positionConstantOfIntegration: number;

  constructor(
    constants: MotorConstants,
    appliedVoltage: number,
    loadTorque: number,
    momentOfInertia: number,
    initialAngularPosition: number,
    initialAngularVelocity: number
  ) {
    this.a =
      -constants.kT / (momentOfInertia * constants.kV * constants.resistance);
    this.b =
      ((constants.kT * appliedVoltage) / constants.resistance - loadTorque) /
      momentOfInertia;

    this.velocityConstantOfIntegration =
      -Math.log(this.a * initialAngularVelocity + this.b) / this.a;

    this.positionConstantOfIntegration =
      initialAngularPosition -
      Math.exp(-this.a * this.velocityConstantOfIntegration) /
        Math.pow(this.a, 2);
  }

  public position(time: number): number {
    return (
      Math.exp(this.a * (time - this.velocityConstantOfIntegration)) /
        Math.pow(this.a, 2) -
      (this.b * time) / this.a +
      this.positionConstantOfIntegration
    );
  }

  public velocity(time: number): number {
    return (
      Math.exp(this.a * (time - this.velocityConstantOfIntegration)) / this.a -
      this.b / this.a
    );
  }

  public acceleration(time: number): number {
    return Math.exp(this.a * (time - this.velocityConstantOfIntegration));
  }
}
