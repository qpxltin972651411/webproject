using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace project.Models
{

    public class UpdateDataName
    {
        public static async Task RunProgram()
        {
            try
            {
                // 建立 scheduler
                StdSchedulerFactory factory = new StdSchedulerFactory();
                IScheduler scheduler = await factory.GetScheduler();

                // 建立 Job
                /*IJobDetail job = JobBuilder.Create<UpdateDataNameJob>()
                    .WithIdentity("job1", "group1")
                    .Build();*/
                IJobDetail jobs = JobBuilder.Create<UpdateDataNameJob>()
                    //.UsingJobData("filename", "5TSFEEWVHE.json")
                    .Build();
                // 建立 Trigger，每天跑一次

                ITrigger trigger = TriggerBuilder.Create()
                    .WithIdentity("trigger1", "group1")
                    .StartNow()
                    //.StartAt(DateBuilder.FutureDate(5, IntervalUnit.Second))
                    .WithSimpleSchedule(x => x
                        .WithIntervalInSeconds(10)
                        .RepeatForever())
                    .Build();

                // 加入 ScheduleJob 中
                await scheduler.ScheduleJob(jobs, trigger);

                // 啟動
                await scheduler.Start();

                // 執行 10 秒
                await Task.Delay(TimeSpan.FromSeconds(2));

                // say goodbye
                await scheduler.Shutdown();
            }
            catch (SchedulerException se)
            {
                await Console.Error.WriteLineAsync(se.ToString());
            }
        }
    }
}
