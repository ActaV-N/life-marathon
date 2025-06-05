(() => {
  // v-variables (search-keyword)
  let yOffset = 0;
  let delayedYOffset = 0;
  const scrollAcc = 0.05;
  let currentScene = 0;
  let prevScrollHeight = 0;
  let enterNewScene = false;

  // RequestAnimationFrame variables
  let rafId;
  let rafState;

  // Animation variables
  const sceneInfo = [
    {
      // Scene 1
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      container: document.querySelector('.scene[data-index="0"]'),
      objs: {
        message1: {
          // 오늘도
          elem: document.querySelector('.scene[data-index="0"] .message-1'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.1, duration: 0.1 },
            translateY_in: { from: 20, to: 0, start: 0.1, duration: 0.1 },

            opacity_out: { from: 1, to: 0, start: 0.25, duration: 0.05 },
            translateY_out: { from: 0, to: -40, start: 0.25, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.22) {
              this.elem.style.opacity = calc(this.values.opacity_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        },
        message2: {
          // 달린다
          elem: document.querySelector('.scene[data-index="0"] .message-2'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.27, duration: 0.1 },
            translateY_in: { from: 20, to: 0, start: 0.27, duration: 0.1 },

            opacity_out: { from: 1, to: 0, start: 0.42, duration: 0.05 },
            translateY_out: { from: 0, to: -40, start: 0.42, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.39) {
              this.elem.style.opacity = calc(this.values.opacity_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        },
        message3: {
          // 모두가
          elem: document.querySelector('.scene[data-index="0"] .message-3'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.5, duration: 0.15 },
            translateX_in: { from: -5, to: 0, start: 0.5, duration: 0.15 },

            opacity_out: { from: 1, to: 0, start: 0.7, duration: 0.05 },
            translateY_out: { from: 0, to: -20, start: 0.7, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.67) {
              this.elem.style.opacity = calc(this.values.opacity_in);
              this.elem.style.transform = `translate3d(${calc(
                this.values.translateX_in
              )}%, 0, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        },
        message4: {
          // 주자이다
          elem: document.querySelector('.scene[data-index="0"] .message-4'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.72, duration: 0.15 },
            translateX_in: { from: 5, to: 0, start: 0.72, duration: 0.15 },

            opacity_out: { from: 1, to: 0, start: 0.95, duration: 0.05 },
            translateY_out: { from: 0, to: 20, start: 0.95, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.86) {
              this.elem.style.opacity = calc(this.values.opacity_in);
              this.elem.style.transform = `translate3d(${calc(
                this.values.translateX_in
              )}%, 0, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        }
      }
    },
    {
      // Scene 2
      type: "sticky",
      heightNum: 8,
      scrollheight: 0,
      container: document.querySelector('.scene[data-index="1"]'),
      objs: {
        clock_circle: {
          elem: document.querySelector('.scene[data-index="1"] .clock-circle'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0, duration: 0.08 },
            opacity_out: { from: 1, to: 0, start: 0.34, duration: 0.08 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.34) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
            }
          }
        },
        circle: {
          elem: document.querySelector(
            '.scene[data-index="1"] .clock-circle circle'
          ),
          values: {
            scale_in: { from: 0.8, to: 1, start: 0, duration: 0.08 },
            scale_out: { from: 1, to: 1.2, start: 0.34, duration: 0.08 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.34) {
              this.elem.style.transform = `scale(${calc(
                this.values.scale_in
              )})`;
            } else {
              this.elem.style.transform = `scale(${calc(
                this.values.scale_out
              )})`;
            }
          }
        },
        message1: {
          // 시계를 멈출 수는 없다
          elem: document.querySelector('.scene[data-index="1"] .message-1'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.1, duration: 0.1 },
            translateY_in: { from: -70, to: -50, start: 0.1, duration: 0.1 },

            translateX_out: { from: 0, to: -100, start: 0.5, duration: 0.12 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.43) {
              this.elem.style.opacity = calc(this.values.opacity_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.transform = `translate3d(${calc(
                this.values.translateX_out
              )}vw, -50%, 0)`;
            }
          }
        },
        message2: {
          // 시간은 한 방향으로 밖에 흐르지 않는다
          elem: document.querySelector('.scene[data-index="1"] .message-2'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.2, duration: 0.1 },
            translateY_in: { from: -30, to: -50, start: 0.2, duration: 0.1 },

            translateX_out: { from: 0, to: -100, start: 0.5, duration: 0.12 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.43) {
              this.elem.style.opacity = calc(this.values.opacity_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.transform = `translate3d(${calc(
                this.values.translateX_out
              )}vw, -50%, 0)`;
            }
          }
        },
        line1: {
          elem: document.querySelector("#course-line line:nth-child(1)"),
          values: {
            width_in: { from: 100, to: 0, start: 0.42, duration: 0.2 },

            opacity_out: { from: 1, to: 0, start: 0.95, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            this.elem.setAttribute("x1", `${calc(this.values.width_in)}vw`);
            this.elem.style.opacity = calc(this.values.opacity_out);
          }
        },
        line2: {
          elem: document.querySelector("#course-line line:nth-child(2)"),
          values: {
            width_in: { from: 100, to: 0, start: 0.42, duration: 0.2 },

            opacity_out: { from: 1, to: 0, start: 0.95, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            this.elem.setAttribute("x1", `${calc(this.values.width_in)}vw`);
            this.elem.style.opacity = calc(this.values.opacity_out);
          }
        },
        horScroll: {
          elem: document.querySelector(".scene[data-index='1'] .hor-scroll"),
          values: {
            left_move: { from: 100, to: -350, start: 0.5, duration: 0.48 },
            opacity_in: { from: 0, to: 1, start: 0.3, duration: 0.05 },
            opacity_out: { from: 1, to: 0, start: 0.95, duration: 0.05 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
            }
            this.elem.style.left = `${calc(this.values.left_move)}vw`;
          }
        }
      }
    },
    {
      // Scene 3
      type: "sticky",
      heightNum: 7,
      scrollHeight: 0,
      container: document.querySelector('.scene[data-index="2"]'),
      objs: {
        message1: {
          // 더 빠르게
          elem: document.querySelector('.scene[data-index="2"] .message-1'),
          text: document.querySelector('.scene[data-index="2"] .message-1 p'),
          getRandomPos: function () {
            const width = document.body.clientWidth - this.text.clientWidth;
            const height = window.innerHeight - this.text.clientHeight;

            const x = Math.random() * width - width / 2;
            const y = Math.random() * height - height / 2;
            const z = -Math.random() * 100;

            return {
              x,
              y,
              z
            };
          },
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.08, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.07) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message2: {
          // 한걸음 더 앞으로
          elem: document.querySelector('.scene[data-index="2"] .message-2'),
          text: document.querySelector('.scene[data-index="2"] .message-2 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.09, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.17, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.16) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message3: {
          // 그 앞에
          elem: document.querySelector('.scene[data-index="2"] .message-3'),
          text: document.querySelector('.scene[data-index="2"] .message-3 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.18, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.26, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.25) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message4: {
          // 미래가 있다고
          elem: document.querySelector('.scene[data-index="2"] .message-4'),
          text: document.querySelector('.scene[data-index="2"] .message-4 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.27, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.35, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.34) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message5: {
          // 생각한다.
          elem: document.querySelector('.scene[data-index="2"] .message-5'),
          text: document.querySelector('.scene[data-index="2"] .message-5 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.36, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.44, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.43) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message6: {
          // 반드시
          elem: document.querySelector('.scene[data-index="2"] .message-6'),
          text: document.querySelector('.scene[data-index="2"] .message-6 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.45, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.53, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.52) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message7: {
          // 결승점이 있다고
          elem: document.querySelector('.scene[data-index="2"] .message-7'),
          text: document.querySelector('.scene[data-index="2"] .message-7 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.54, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.62, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.61) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message8: {
          // 생각한다.
          elem: document.querySelector('.scene[data-index="2"] .message-8'),
          text: document.querySelector('.scene[data-index="2"] .message-8 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.63, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.71, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.7) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message9: {
          // 그게 정말일까?
          elem: document.querySelector('.scene[data-index="2"] .message-9'),
          text: document.querySelector('.scene[data-index="2"] .message-9 p'),
          values: {
            randomVal: {
              randomX: Math.random(),
              randomY: Math.random(),
              z: -Math.random() * 100
            },
            opacity_in: { from: 0, to: 1, start: 0.72, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.8, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            const width =
              document.body.clientWidth -
              this.text.getBoundingClientRect().width;
            const height =
              window.innerHeight - this.text.getBoundingClientRect().height;
            const { randomX, randomY, z } = this.values.randomVal;

            const x = randomX * width - width / 2;
            const y = randomY * height - height / 2;

            this.text.style.transform = `translate3d(${x}px, ${y}px, ${z}vmin)`;

            if (scrollRatio < 0.79) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        },
        message10: {
          // 인생이란 그런 것인가?
          elem: document.querySelector('.scene[data-index="2"] .message-10'),
          text: document.querySelector('.scene[data-index="2"] .message-10 p'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0.81, duration: 0.06 },
            opacity_out: { from: 1, to: 0.15, start: 0.89, duration: 0.05 },
            opacity_off: { from: 0.15, to: 0, start: 0.94, duration: 0.06 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.88) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else if (scrollRatio < 0.94) {
              this.elem.style.opacity = calc(this.values.opacity_out);
            } else {
              this.elem.style.opacity = calc(this.values.opacity_off);
            }
          }
        }
      }
    },
    {
      // Scene 4
      type: "sticky",
      heightNum: 15,
      scrollHeight: 0,
      container: document.querySelector('.scene[data-index="3"]'),
      objs: {
        message1: {
          elem: document.querySelector('.scene[data-index="3"] .message-1'),
          values: {
            opacity_in: { from: 0, to: 1, start: 0, duration: 0.02 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.03) {
              this.elem.style.opacity = calc(this.values.opacity_in);
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message2: {
          elem: document.querySelector('.scene[data-index="3"] .message-2'),
          values: {
            scale_in: { from: 1, to: 1.3, start: 0.03, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.03 && scrollRatio < 0.06) {
              this.elem.style.color = "#fff";
              this.elem.style.opacity = 1;
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(${calc(
                this.values.scale_in
              )})`;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message3: {
          elem: document.querySelector('.scene[data-index="3"] .message-3'),
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.06 && scrollRatio < 0.09) {
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message4: {
          elem: document.querySelector('.scene[data-index="3"] .message-4'),

          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.09 && scrollRatio < 0.12) {
              this.elem.style.opacity = 1;
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(1.3)`;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message5: {
          elem: document.querySelector('.scene[data-index="3"] .message-5'),
          values: {
            scale_in: { from: 1, to: 1.3, start: 0.12, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (
              (scrollRatio >= 0.12 && scrollRatio < 0.13) ||
              (scrollRatio >= 0.14 && scrollRatio < 0.15)
            ) {
              this.elem.style.color = "#fff";
              this.elem.style.opacity = 1;
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(${calc(
                this.values.scale_in
              )})`;
            } else if (scrollRatio >= 0.13 && scrollRatio < 0.14) {
              this.elem.style.color = "#3e3e3e";
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message6: {
          elem: document.querySelector('.scene[data-index="3"] .message-6'),

          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.15 && scrollRatio < 0.18) {
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message7: {
          elem: document.querySelector('.scene[data-index="3"] .message-7'),

          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.18 && scrollRatio < 0.21) {
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(1.3)`;
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message8: {
          elem: document.querySelector('.scene[data-index="3"] .message-8'),
          v_text1: document.querySelector(
            '.scene[data-index="3"] .message-8 .v-text:nth-child(1)'
          ),
          v_text2: document.querySelector(
            '.scene[data-index="3"] .message-8 .v-text:nth-child(2)'
          ),

          values: {
            v_text2_opacity_in: { from: 0, to: 1, start: 0.23, duration: 0.03 },
            v_text2_translateY_in: {
              from: 20,
              to: 0,
              start: 0.23,
              duration: 0.03
            },

            v_text1_opacity_out: {
              from: 1,
              to: 0,
              start: 0.22,
              duration: 0.02
            },
            v_text1_translateY_out: {
              from: 0,
              to: -20,
              start: 0.22,
              duration: 0.02
            }
            // v_text2_opacity_out: {from:1, to:},
            // v_text2_translateY_out: {}
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.21 && scrollRatio < 0.22) {
              this.elem.style.color = "#fff";
              this.elem.style.opacity = 1;
            } else if (scrollRatio >= 0.22 && scrollRatio < 0.27) {
              this.elem.style.opacity = 1;
              this.elem.style.color = "#fff";

              this.v_text2.style.opacity = calc(this.values.v_text2_opacity_in);
              this.v_text2.style.transform = `translate3d(0, ${calc(
                this.values.v_text2_translateY_in
              )}%, 0)`;

              this.v_text1.style.opacity = calc(
                this.values.v_text1_opacity_out
              );
              this.v_text1.style.transform = `translate3d(0, ${calc(
                this.values.v_text1_translateY_out
              )}%, 0)`;
              this.v_text2.style.opacity = calc(this.values.v_text2_opacity_in);
              this.v_text2.style.transform = `translate3d(0, ${calc(
                this.values.v_text2_translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message9: {
          // 우리가 아직
          elem: document.querySelector('.scene[data-index="3"] .message-9'),
          p_text: document.querySelector(
            '.scene[data-index="3"] .message-9 .p-text'
          ),
          pd_text: document.querySelector(
            '.scene[data-index="3"] .message-9 .pd-text'
          ),
          values: {
            p_opacity_in: { from: 0, to: 1, start: 0.3, duration: 0.02 },
            p_translateX_in: { from: 0, to: -50, start: 0.3, duration: 0.02 },

            pd_translateX_in: { from: 0, to: -50, start: 0.27, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.27 && scrollRatio < 0.33) {
              this.p_text.style.opacity = calc(this.values.p_opacity_in);
              this.p_text.style.transform = `translate3d(${calc(
                this.values.p_translateX_in
              )}%,0,0)`;
              this.pd_text.style.transform = `translate3d(${calc(
                this.values.pd_translateX_in
              )}%,0,0)`;
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message10: {
          // 만나지 않은
          elem: document.querySelector('.scene[data-index="3"] .message-10'),
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.33 && scrollRatio < 0.36) {
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(1.3)`;
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message11: {
          // 세계는
          elem: document.querySelector('.scene[data-index="3"] .message-11'),
          animate: function (calc, scrollRatio) {
            if (
              (scrollRatio >= 0.36 && scrollRatio < 0.37) ||
              (scrollRatio >= 0.38 && scrollRatio < 0.39)
            ) {
              this.elem.style.opacity = 1;
              this.elem.style.color = "#fff";
            } else if (scrollRatio >= 0.37 && scrollRatio < 0.38) {
              this.elem.style.color = "#3e3e3e";
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message12: {
          // 엄청나게
          elem: document.querySelector('.scene[data-index="3"] .message-12'),
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.39 && scrollRatio < 0.42) {
              this.elem.style.opacity = 1;
              this.elem.style.color = "#fff";
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(1.3)`;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message13: {
          // 넓다.
          elem: document.querySelector('.scene[data-index="3"] .message-13'),
          values: {
            scale_in: { from: 1.3, to: 1.5, start: 0.42, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.42 && scrollRatio < 0.45) {
              this.elem.style.opacity = 1;
              this.elem.style.color = "#fff";
              this.elem.style.transform = `translate3d(0, -50%, 0) scale(${calc(
                this.values.scale_in
              )})`;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message14: {
          // 그래
          elem: document.querySelector('.scene[data-index="3"] .message-14'),
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.45 && scrollRatio < 0.48) {
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message15: {
          // 그냥 내딛는거다.
          elem: document.querySelector('.scene[data-index="3"] .message-15'),
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.48 && scrollRatio < 0.51) {
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message16: {
          // 고민하고 고민해서
          elem: document.querySelector('.scene[data-index="3"] .message-16'),
          v_text1: document.querySelector(
            '.scene[data-index="3"] .message-16 .v-text:nth-child(1)'
          ),
          v_text2: document.querySelector(
            '.scene[data-index="3"] .message-16 .v-text:nth-child(2)'
          ),
          values: {
            v_text2_opacity_in: { from: 0, to: 1, start: 0.53, duration: 0.03 },
            v_text2_translateY_in: {
              from: 20,
              to: 0,
              start: 0.53,
              duration: 0.03
            },

            v_text1_opacity_out: {
              from: 1,
              to: 0,
              start: 0.52,
              duration: 0.02
            },
            v_text1_translateY_out: {
              from: 0,
              to: -20,
              start: 0.52,
              duration: 0.02
            }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.51 && scrollRatio < 0.52) {
              this.elem.style.opacity = 1;
            } else if (scrollRatio >= 0.52 && scrollRatio < 0.57) {
              this.elem.style.opacity = 1;

              this.v_text2.style.opacity = calc(this.values.v_text2_opacity_in);
              this.v_text2.style.transform = `translate3d(0, ${calc(
                this.values.v_text2_translateY_in
              )}%,0)`;

              this.v_text1.style.opacity = calc(
                this.values.v_text1_opacity_out
              );
              this.v_text1.style.transform = `translate3d(0, ${calc(
                this.values.v_text1_translateY_out
              )}%, 0)`;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message17: {
          elem: document.querySelector('.scene[data-index="3"] .message-17'),
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.57 && scrollRatio < 0.6) {
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message18: {
          // 실패해도 좋다, 돌아가도 좋다
          elem: document.querySelector('.scene[data-index="3"] .message-18'),
          v_text1: document.querySelector(
            '.scene[data-index="3"] .message-18 .v-text:nth-child(1)'
          ),
          v_text2: document.querySelector(
            '.scene[data-index="3"] .message-18 .v-text:nth-child(2)'
          ),
          values: {
            v_text2_opacity_in: { from: 0, to: 1, start: 0.62, duration: 0.03 },
            v_text2_translateY_in: {
              from: 20,
              to: 0,
              start: 0.62,
              duration: 0.03
            },

            v_text1_opacity_out: {
              from: 1,
              to: 0,
              start: 0.61,
              duration: 0.02
            },
            v_text1_translateY_out: {
              from: 0,
              to: -20,
              start: 0.61,
              duration: 0.02
            }
          },

          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.6 && scrollRatio < 0.61) {
              this.elem.style.opacity = 1;
              this.elem.style.color = "#fff";
            } else if (scrollRatio >= 0.61 && scrollRatio < 0.66) {
              this.v_text2.style.opacity = calc(this.values.v_text2_opacity_in);
              this.v_text2.style.transform = `translate3d(0, ${calc(
                this.values.v_text2_translateY_in
              )}%,0)`;

              this.v_text1.style.opacity = calc(
                this.values.v_text1_opacity_out
              );
              this.v_text1.style.transform = `translate3d(0, ${calc(
                this.values.v_text1_translateY_out
              )}%, 0)`;

              this.elem.style.opacity = 1;
              this.elem.style.color = "#fff";
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message19: {
          // 누군가와 비교하지 않아도 된다
          elem: document.querySelector('.scene[data-index="3"] .message-19'),
          p_text: document.querySelector(
            '.scene[data-index="3"] .message-19 .p-text'
          ),
          pd_text: document.querySelector(
            '.scene[data-index="3"] .message-19 .pd-text'
          ),
          values: {
            p_opacity_in: { from: 0, to: 1, start: 0.69, duration: 0.02 },
            p_translateX_in: { from: 0, to: -50, start: 0.69, duration: 0.02 },

            pd_translateX_in: { from: 0, to: -60, start: 0.66, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.66 && scrollRatio < 0.72) {
              this.p_text.style.opacity = calc(this.values.p_opacity_in);
              this.p_text.style.transform = `translate3d(${this.values.p_translateX_in.to}%,0,0)`;

              this.pd_text.style.transform = `translate3d(${calc(
                this.values.pd_translateX_in
              )}%,0,0)`;
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message20: {
          // 길은 하나가 아니다
          elem: document.querySelector('.scene[data-index="3"] .message-20'),
          p_text: document.querySelector(
            '.scene[data-index="3"] .message-20 .p-text'
          ),
          pd_text: document.querySelector(
            '.scene[data-index="3"] .message-20 .pd-text'
          ),
          values: {
            p_opacity_in: { from: 0, to: 1, start: 0.75, duration: 0.02 },
            p_translateX_in: { from: 0, to: -50, start: 0.75, duration: 0.02 },

            pd_translateX_in: { from: 0, to: -50, start: 0.72, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.72 && scrollRatio < 0.78) {
              this.p_text.style.opacity = calc(this.values.p_opacity_in);
              this.p_text.style.transform = `translate3d(${this.values.p_translateX_in.to}%,0,0)`;

              this.pd_text.style.transform = `translate3d(${calc(
                this.values.pd_translateX_in
              )}%,0,0)`;
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message21: {
          // 결승점은 하나가 아니다.
          elem: document.querySelector('.scene[data-index="3"] .message-21'),
          p_text: document.querySelector(
            '.scene[data-index="3"] .message-21 .p-text'
          ),
          pd_text: document.querySelector(
            '.scene[data-index="3"] .message-21 .pd-text'
          ),
          values: {
            p_opacity_in: { from: 0, to: 1, start: 0.81, duration: 0.02 },
            p_translateX_in: { from: 0, to: -52, start: 0.81, duration: 0.02 },

            pd_translateX_in: { from: 0, to: -35, start: 0.78, duration: 0.03 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio >= 0.78 && scrollRatio < 0.84) {
              this.p_text.style.opacity = calc(this.values.p_opacity_in);
              this.p_text.style.transform = `translate3d(${this.values.p_translateX_in.to}%,0,0)`;
              this.pd_text.style.transform = `translate3d(${calc(
                this.values.pd_translateX_in
              )}%,0,0)`;
              this.elem.style.opacity = 1;
            } else {
              this.elem.style.opacity = 0;
            }
          }
        },
        message22: {
          elem: document.querySelector('.scene[data-index="3"] .message-22'),
          values: {
            opactiy_in: { from: 0, to: 1, start: 0.84, duration: 0.05 },
            translateY_in: { from: -30, to: -50, start: 0.84, duration: 0.05 },

            opactiy_out: { from: 1, to: 0, start: 0.9, duration: 0.02 },
            translateY_out: { from: -50, to: -70, start: 0.9, duration: 0.02 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.895) {
              this.elem.style.opacity = calc(this.values.opactiy_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opactiy_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        },
        message23: {
          elem: document.querySelector('.scene[data-index="3"] .message-23'),
          values: {
            opactiy_in: { from: 0, to: 1, start: 0.92, duration: 0.05 },
            translateY_in: { from: -30, to: -50, start: 0.92, duration: 0.05 },

            opactiy_out: { from: 1, to: 0, start: 0.98, duration: 0.02 },
            translateY_out: { from: -50, to: -70, start: 0.98, duration: 0.02 }
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.975) {
              this.elem.style.opacity = calc(this.values.opactiy_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opactiy_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        },
        container: {
          elem: document.querySelector('.scene[data-index="3"]'),
          animate: function (calc, scrollRatio) {
            if (
              (scrollRatio >= 0.03 && scrollRatio < 0.06) ||
              (scrollRatio >= 0.12 && scrollRatio < 0.13) ||
              (scrollRatio >= 0.14 && scrollRatio < 0.15) ||
              (scrollRatio >= 0.21 && scrollRatio < 0.27) ||
              (scrollRatio >= 0.36 && scrollRatio < 0.37) ||
              (scrollRatio >= 0.38 && scrollRatio < 0.39) ||
              (scrollRatio >= 0.39 && scrollRatio < 0.42) ||
              (scrollRatio >= 0.42 && scrollRatio < 0.45) ||
              (scrollRatio >= 0.6 && scrollRatio < 0.66)
            ) {
              this.elem.style.backgroundColor = "#1e1e1e";
            } else {
              this.elem.style.backgroundColor = "#fff";
            }
          }
        }
      }
    },
    {
      heightNum: 2,
      scrollHeight: 0,
      container: document.querySelector('.scene[data-index="4"]'),
      objs: {
        message1: {
          elem: document.querySelector('.scene[data-index="4"] .message-1'),
          pd_left: document.querySelector(
            '.scene[data-index="4"] .message-1 span:nth-child(1)'
          ),
          pd_right: document.querySelector(
            '.scene[data-index="4"] .message-1 span:nth-child(3)'
          ),
          p: document.querySelector(
            '.scene[data-index="4"] .message-1 span:nth-child(2)'
          ),
          values: {
            opactiy_in: { from: 0, to: 1, start: 0, duration: 0.4 },
            translateY_in: { from: -30, to: -50, start: 0, duration: 0.4 },

            left_translateX: {
              from: 0,
              start: 0.4,
              duration: 0.15
            },
            right_translateX: {
              from: 0,
              start: 0.4,
              duration: 0.15
            },
            p_opacity: { from: 0, to: 1, start: 0.6, duration: 0.15 },

            opacity_out: { from: 1, to: 0, start: 0.8, duration: 0.1 },
            translateY_out: { from: -50, to: -70, start: 0.8, duration: 0.1 }
          },
          refine: function (strings, values) {
            return {
              ...this.values[strings[0]],
              to: values / 2
            };
          },
          animate: function (calc, scrollRatio) {
            if (scrollRatio < 0.77) {
              const p_width = this.p.clientWidth;

              this.elem.style.opacity = calc(this.values.opactiy_in);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_in
              )}%, 0)`;

              this.p.style.opacity = calc(this.values.p_opacity);
              this.pd_left.style.transform = `translate3d(${calc(
                this.refine`left_translateX${-p_width}`
              )}px, 0, 0)`;
              this.pd_right.style.transform = `translate3d(${calc(
                this.refine`left_translateX${p_width}`
              )}px, 0, 0)`;
            } else {
              this.elem.style.opacity = calc(this.values.opacity_out);
              this.elem.style.transform = `translate3d(0, ${calc(
                this.values.translateY_out
              )}%, 0)`;
            }
          }
        }
      }
    },
    {
      // Scene for last scene
      heightNum: 1,
      scrollHeight: 0,
      container: document.querySelector('.scene[data-index="final"]')
    }
  ];

  // Event Functions
  function scrollLoop() {
    // Scroll Loops
    // f-scrollLoop (search-keyword)
    prevScrollHeight = 0;
    enterNewScene = false;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (
      delayedYOffset >
      prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      // to next scene
      // if (currentScene === sceneInfo.length - 2) return;
      prevScrollHeight += sceneInfo[currentScene].scrollHeight;

      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
      enterNewScene = true;
    } else if (delayedYOffset < prevScrollHeight) {
      // to previous scene
      if (delayedYOffset < 0) return;
      currentScene--;
      prevScrollHeight -= sceneInfo[currentScene].scrollHeight;

      document.body.setAttribute("id", `show-scene-${currentScene}`);
      enterNewScene = true;
    }

    if (enterNewScene) {
      return;
    }
  }

  function animate() {
    // Set delayedYOffset for smooth animation
    // f-animate (search-keyword)
    delayedYOffset += (yOffset - delayedYOffset) * scrollAcc;

    scrollLoop();

    const scene = sceneInfo[currentScene];
    const currentYOffset = delayedYOffset - prevScrollHeight;
    let scrollRatio = currentYOffset / scene.scrollHeight;
    const objs = scene.objs;

    const bindedCalc = calcValues.bind(null, scrollRatio);

    switch (currentScene) {
      case 0:
        // f-scene0 (search keyword)
        objs.message1.animate(bindedCalc, scrollRatio);
        objs.message2.animate(bindedCalc, scrollRatio);
        objs.message3.animate(bindedCalc, scrollRatio);
        objs.message4.animate(bindedCalc, scrollRatio);
        break;

      case 1:
        // f-scene1 (search keyword)
        objs.clock_circle.animate(bindedCalc, scrollRatio);
        objs.circle.animate(bindedCalc, scrollRatio);
        objs.message1.animate(bindedCalc, scrollRatio);
        objs.message2.animate(bindedCalc, scrollRatio);
        objs.line1.animate(bindedCalc, scrollRatio);
        objs.line2.animate(bindedCalc, scrollRatio);
        objs.horScroll.animate(bindedCalc, scrollRatio);

        break;

      case 2:
        // f-scene2 (search keyword)
        objs.message1.animate(bindedCalc, scrollRatio);
        objs.message2.animate(bindedCalc, scrollRatio);
        objs.message3.animate(bindedCalc, scrollRatio);
        objs.message4.animate(bindedCalc, scrollRatio);
        objs.message5.animate(bindedCalc, scrollRatio);
        objs.message6.animate(bindedCalc, scrollRatio);
        objs.message7.animate(bindedCalc, scrollRatio);
        objs.message8.animate(bindedCalc, scrollRatio);
        objs.message9.animate(bindedCalc, scrollRatio);
        objs.message10.animate(bindedCalc, scrollRatio);
        break;

      case 3:
        // f-scene3 (search-keyword)
        objs.message1.animate(bindedCalc, scrollRatio);
        objs.message2.animate(bindedCalc, scrollRatio);
        objs.message3.animate(bindedCalc, scrollRatio);
        objs.message4.animate(bindedCalc, scrollRatio);
        objs.message5.animate(bindedCalc, scrollRatio);
        objs.message6.animate(bindedCalc, scrollRatio);
        objs.message7.animate(bindedCalc, scrollRatio);
        objs.message8.animate(bindedCalc, scrollRatio);
        objs.message9.animate(bindedCalc, scrollRatio);
        objs.message10.animate(bindedCalc, scrollRatio);
        objs.message11.animate(bindedCalc, scrollRatio);
        objs.message12.animate(bindedCalc, scrollRatio);
        objs.message13.animate(bindedCalc, scrollRatio);
        objs.message14.animate(bindedCalc, scrollRatio);
        objs.message15.animate(bindedCalc, scrollRatio);
        objs.message16.animate(bindedCalc, scrollRatio);
        objs.message17.animate(bindedCalc, scrollRatio);
        objs.message18.animate(bindedCalc, scrollRatio);
        objs.message19.animate(bindedCalc, scrollRatio);
        objs.message20.animate(bindedCalc, scrollRatio);
        objs.message21.animate(bindedCalc, scrollRatio);
        objs.message22.animate(bindedCalc, scrollRatio);
        objs.message23.animate(bindedCalc, scrollRatio);

        objs.container.animate(bindedCalc, scrollRatio);
        break;

      case 4:
        objs.message1.animate(bindedCalc, scrollRatio);
        break;

      default:
        break;
    }

    rafId = requestAnimationFrame(animate);

    if (Math.abs(yOffset - delayedYOffset) < 0.01) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  function setLayout() {
    // Set layout of the page
    // f-setLayout (search-keyword)
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (yOffset <= totalScrollHeight) {
        currentScene = i;
        break;
      }
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(scrollRatio, ani_info) {
    if (!ani_info) return;
    let rv = 0;

    if (ani_info.start || ani_info.start === 0) {
      if (scrollRatio < ani_info.start) {
        rv = ani_info.from;
      } else if (scrollRatio > ani_info.start + ani_info.duration) {
        rv = ani_info.to;
      } else {
        rv =
          ((ani_info.to - ani_info.from) * (scrollRatio - ani_info.start)) /
            ani_info.duration +
          ani_info.from;
      }
    } else {
      rv = (ani_info.to - ani_info.from) * scrollRatio + ani_info.from;
    }

    return rv;
  }

  // Event Listeners
  window.addEventListener("load", () => {
    // e-load (search-keyword)
    setLayout();
    window.addEventListener("scroll", () => {
      // e-scroll (search-keyword)
      yOffset = window.pageYOffset;

      if (!rafState) {
        rafId = requestAnimationFrame(animate);
        rafState = true;
      }
    });
  });
})();
